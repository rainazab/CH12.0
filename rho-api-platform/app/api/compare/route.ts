import { NextRequest, NextResponse } from 'next/server';
import { runComparison } from '@/lib/runApi';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, apis, userId } = body;

    if (!prompt || !apis || !Array.isArray(apis)) {
      return NextResponse.json(
        { error: 'Missing prompt or apis array' },
        { status: 400 }
      );
    }

    // Limit to maximum 3 APIs per comparison to control costs
    const limitedApis = apis.slice(0, 3);

    const results = await runComparison(prompt, limitedApis, userId);

    return NextResponse.json(results);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

