import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test basic functionality
    const timestamp = new Date().toISOString();
    const nodeVersion = process.version;
    const env = process.env.NODE_ENV;

    return NextResponse.json({
      status: 'ok',
      timestamp,
      nodeVersion,
      environment: env,
      message: 'Rho API Platform is running!'
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

