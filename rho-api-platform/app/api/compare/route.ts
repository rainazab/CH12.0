import { NextRequest, NextResponse } from 'next/server';
import { runComparison } from '@/lib/runApi';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, apis } = body;

    if (!prompt || !apis || !Array.isArray(apis)) {
      return NextResponse.json(
        { error: 'Missing prompt or apis array' },
        { status: 400 }
      );
    }

    const results = await runComparison(prompt, apis);

    return NextResponse.json(results);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

