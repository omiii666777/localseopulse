import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const input = searchParams.get('input')?.trim() || '';
    const city = searchParams.get('city')?.trim() || '';

    if (input.length < 2) {
      return NextResponse.json({ predictions: [] });
    }

    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Server configuration error: Missing GOOGLE_PLACES_API_KEY' },
        { status: 500 }
      );
    }

    const combinedQuery = city ? `${input} ${city}` : input;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      combinedQuery
    )}&types=establishment&key=${apiKey}`;

    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to reach Google Places Autocomplete service' },
        { status: 502 }
      );
    }

    const data = await response.json();
    return NextResponse.json({
      predictions: Array.isArray(data.predictions) ? data.predictions.slice(0, 6) : [],
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected autocomplete error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
