import { RawAuditData, AuditIssue, CompetitorSummary } from '@/types/audit';

interface RunAuditParams {
  placeDetails: RawAuditData['placeDetails'];
  competitors: CompetitorSummary[];
}

export function generateAuditData({ placeDetails, competitors }: RunAuditParams): RawAuditData {
  const issues: { critical: AuditIssue[]; warnings: AuditIssue[]; passed: AuditIssue[] } = {
    critical: [],
    warnings: [],
    passed: [],
  };

  const baseScore = 100;
  let reviewCountDeduction = 0;
  let ratingDeduction = 0;
  let websiteDeduction = 0;
  let napDeduction = 0;
  let categoryDeduction = 0;

  const avgRating = competitors.length > 0 
    ? competitors.reduce((acc, c) => acc + c.rating, 0) / competitors.length 
    : 4.5;
  
  const avgReviewCount = competitors.length > 0 
    ? Math.round(competitors.reduce((acc, c) => acc + c.reviewCount, 0) / competitors.length) 
    : 50;

  if (placeDetails.rating < 4.0) {
    ratingDeduction = 15;
    issues.critical.push({
      id: 'low-rating',
      severity: 'critical',
      title: 'Star Rating Below Local Average',
      description: `Your rating of ${placeDetails.rating} stars falls short of the competitor average (${avgRating.toFixed(1)}).`,
      recommendation: 'Implement a systematic review request routine via WhatsApp or SMS.',
      impactPoints: 15,
      metricValue: `${placeDetails.rating} Stars`,
      benchmarkValue: `${avgRating.toFixed(1)} Stars`
    });
  } else {
    issues.passed.push({
      id: 'good-rating',
      severity: 'passed',
      title: 'Healthy Star Rating',
      description: `Your rating of ${placeDetails.rating} stars meets competitive benchmarks.`,
      recommendation: 'Maintain your current customer satisfaction standards.',
      impactPoints: 0,
      metricValue: `${placeDetails.rating} Stars`,
      benchmarkValue: `${avgRating.toFixed(1)} Stars`
    });
  }

  if (placeDetails.userRatingsTotal < avgReviewCount) {
    reviewCountDeduction = 10;
    issues.warnings.push({
      id: 'low-review-count',
      severity: 'warning',
      title: 'Review Volume Trails Competitors',
      description: `You have ${placeDetails.userRatingsTotal} reviews while local competitors average ${avgReviewCount}.`,
      recommendation: 'Boost review velocity by following up with customers immediately after service.',
      impactPoints: 10,
      metricValue: `${placeDetails.userRatingsTotal} Reviews`,
      benchmarkValue: `${avgReviewCount} Reviews`
    });
  }

  if (!placeDetails.submittedWebsiteUrl && !placeDetails.googleWebsiteUrl) {
    websiteDeduction = 25;
    issues.critical.push({
      id: 'missing-website',
      severity: 'critical',
      title: 'Missing Official Website',
      description: 'Your Google Business Profile does not have a verified website link.',
      recommendation: 'Link a fast, mobile-optimized website to your Google Business Profile.',
      impactPoints: 25,
      metricValue: 'None',
      benchmarkValue: 'Active Website'
    });
  }

  const totalDeductions = reviewCountDeduction + ratingDeduction + websiteDeduction + napDeduction + categoryDeduction;
  const finalScore = Math.max(0, baseScore - totalDeductions);

  return {
    placeDetails,
    scoreBreakdown: {
      baseScore,
      reviewCountDeduction,
      ratingDeduction,
      websiteDeduction,
      napDeduction,
      categoryDeduction,
      finalScore,
    },
    issues,
    competitorAnalysis: {
      averageRating: Number(avgRating.toFixed(1)),
      averageReviewCount: avgReviewCount,
      competitors,
    },
    auditedAt: new Date().toISOString(),
  };
}

interface AuditOptions {
  placeId?: string | null;
  businessName?: string;
  city?: string;
  websiteUrl?: string | null;
  apiKey?: string;
}

export interface AuditExecutionResult {
  exactBusinessName: string;
  placeId: string;
  healthScore: number;
  rawAuditData: RawAuditData;
}

export async function executeFullAudit(options: AuditOptions | string): Promise<AuditExecutionResult> {
  const placeId = typeof options === 'string' ? options : options.placeId;
  const businessName = typeof options === 'object' ? options.businessName : undefined;
  const city = typeof options === 'object' ? options.city : undefined;
  const websiteUrl = typeof options === 'object' ? options.websiteUrl : undefined;
  const apiKey = typeof options === 'object' ? options.apiKey || process.env.GOOGLE_PLACES_API_KEY : process.env.GOOGLE_PLACES_API_KEY;

  let resolvedPlaceId = placeId;
  let placeDetailsData: any = null;

  if (!resolvedPlaceId && businessName && city) {
    const searchQuery = encodeURIComponent(`${businessName} in ${city}`);
    const searchRes = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchQuery}&key=${apiKey}`
    );
    const searchData = await searchRes.json();
    
    if (searchData.results && searchData.results.length > 0) {
      resolvedPlaceId = searchData.results[0].place_id;
    }
  }

  if (resolvedPlaceId) {
    const detailsRes = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${resolvedPlaceId}&fields=name,formatted_address,formatted_phone_number,rating,user_ratings_total,types,website,opening_hours,business_status,reviews&key=${apiKey}`
    );
    const detailsData = await detailsRes.json();
    placeDetailsData = detailsData.result;
  }

  const exactName = placeDetailsData?.name || businessName || 'Local Business';
  const formattedAddress = placeDetailsData?.formatted_address || city || 'Local Area';
  const rating = placeDetailsData?.rating || 4.2;
  const userRatingsTotal = placeDetailsData?.user_ratings_total || 25;
  const primaryCategory = placeDetailsData?.types?.[0] || 'Local Business';
  const googleWebsiteUrl = placeDetailsData?.website || null;

  const placeDetails = {
    placeId: resolvedPlaceId || 'fallback-place-id',
    exactName,
    formattedAddress,
    phoneNumber: placeDetailsData?.formatted_phone_number || null,
    rating,
    userRatingsTotal,
    primaryCategory,
    secondaryCategories: placeDetailsData?.types?.slice(1) || [],
    googleWebsiteUrl,
    submittedWebsiteUrl: websiteUrl || null,
    hasOpeningHours: !!placeDetailsData?.opening_hours,
    weekdayText: placeDetailsData?.opening_hours?.weekday_text || [],
    businessStatus: placeDetailsData?.business_status || 'OPERATIONAL',
    recentReviews: (placeDetailsData?.reviews || []).slice(0, 5).map((r: any) => ({
      author_name: r.author_name,
      rating: r.rating,
      text: r.text,
      time: r.time,
      relative_time_description: r.relative_time_description
    }))
  };

  let competitors: CompetitorSummary[] = [];
  if (city && primaryCategory) {
    try {
      const compRes = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(`${primaryCategory} in ${city}`)}&key=${apiKey}`
      );
      const compData = await compRes.json();
      if (compData.results) {
        competitors = compData.results
          .filter((c: any) => c.place_id !== resolvedPlaceId)
          .slice(0, 5)
          .map((c: any) => ({
            placeId: c.place_id,
            name: c.name,
            rating: c.rating || 4.0,
            reviewCount: c.user_ratings_total || 10,
            address: c.formatted_address || '',
            primaryCategory: primaryCategory
          }));
      }
    } catch (e) {
      console.error('Failed to fetch competitors:', e);
    }
  }

  const rawAuditData = generateAuditData({
    placeDetails,
    competitors
  });

  return {
    exactBusinessName: exactName,
    placeId: resolvedPlaceId || 'fallback-place-id',
    healthScore: rawAuditData.scoreBreakdown.finalScore,
    rawAuditData
  };
}
