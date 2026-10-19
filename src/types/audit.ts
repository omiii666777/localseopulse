export type IssueSeverity = 'critical' | 'warning' | 'passed';

export interface AuditIssue {
  id: string;
  severity: IssueSeverity;
  title: string;
  description: string;
  recommendation: string;
  impactPoints: number;
  metricValue: string;
  benchmarkValue: string;
}

export interface CompetitorSummary {
  placeId: string;
  name: string;
  rating: number;
  reviewCount: number;
  address: string;
  primaryCategory: string;
}

export interface PlaceReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  relative_time_description: string;
}

export interface RawAuditData {
  placeDetails: {
    placeId: string;
    exactName: string;
    formattedAddress: string;
    phoneNumber: string | null;
    rating: number;
    userRatingsTotal: number;
    primaryCategory: string | null;
    secondaryCategories: string[];
    googleWebsiteUrl: string | null;
    submittedWebsiteUrl: string | null;
    hasOpeningHours: boolean;
    weekdayText: string[];
    businessStatus: string;
    recentReviews: PlaceReview[];
  };
  scoreBreakdown: {
    baseScore: number;
    reviewCountDeduction: number;
    ratingDeduction: number;
    websiteDeduction: number;
    napDeduction: number;
    categoryDeduction: number;
    finalScore: number;
  };
  issues: {
    critical: AuditIssue[];
    warnings: AuditIssue[];
    passed: AuditIssue[];
  };
  competitorAnalysis: {
    averageRating: number;
    averageReviewCount: number;
    competitors: CompetitorSummary[];
  };
  auditedAt: string;
}

export interface AuditRecord {
  id: string;
  user_id: string | null;
  business_name: string;
  place_id: string;
  city: string;
  website_url: string | null;
  health_score: number;
  raw_audit_data: RawAuditData;
  created_at: string;
}

export interface AutocompletePrediction {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}
