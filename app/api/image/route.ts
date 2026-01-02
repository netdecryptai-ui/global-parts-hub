import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  
  if (!url) {
    return new NextResponse('Missing URL', { status: 400 });
  }

  try {
    // We act like a real browser (User-Agent) so Amazon/Alibaba doesn't block us
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      }
    });

    if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);

    const blob = await response.blob();
    const headers = new Headers();
    
    // Pass the image type (jpg, png) back to the browser
    headers.set("Content-Type", response.headers.get("Content-Type") || "image/jpeg");
    // Cache it so it loads instantly next time
    headers.set("Cache-Control", "public, max-age=86400");

    return new NextResponse(blob, { headers });
  } catch (error) {
    console.error("Image Proxy Error:", error);
    // Return a 1x1 transparent pixel if it fails, so no "broken icon" shows
    return new NextResponse(null, { status: 404 });
  }
}