import { ImageResponse } from 'next/og';

/**
 * NOTE: no `runtime = 'edge'` export here — this project sets
 * `cacheComponents: true` in next.config.ts, and Next 16 rejects a
 * per-route edge runtime under that setting (build error). ImageResponse
 * works on the default Node.js runtime, so the route runs there instead.
 */

/**
 * Dynamic Open Graph image: /og?title=Your%20Page%20Title
 * 1200×630, navy background with diagonal stripes, ADD CREATIVES wordmark.
 * Dependency-free beyond next/og.
 */
export async function GET(request: Request): Promise<ImageResponse> {
  const { searchParams } = new URL(request.url);
  const rawTitle = searchParams.get('title')?.trim();
  const title =
    rawTitle && rawTitle.length > 0
      ? rawTitle.slice(0, 120)
      : 'Digital Solutions That Drive Growth';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#114172',
          color: '#ffffff',
          padding: '64px 72px',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Diagonal stripes */}
        <div
          style={{
            position: 'absolute',
            top: '-180px',
            right: '-120px',
            width: '640px',
            height: '1000px',
            backgroundColor: '#0b4ea2',
            transform: 'rotate(24deg)',
            opacity: 0.55,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '-180px',
            right: '120px',
            width: '36px',
            height: '1000px',
            backgroundColor: '#ffffff',
            transform: 'rotate(24deg)',
            opacity: 0.12,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-220px',
            left: '-160px',
            width: '520px',
            height: '480px',
            backgroundColor: '#05367b',
            transform: 'rotate(24deg)',
            opacity: 0.6,
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '12px',
              backgroundColor: '#ffffff',
              color: '#114172',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              fontWeight: 800,
            }}
          >
            A
          </div>
          <div style={{ fontSize: '30px', fontWeight: 800, letterSpacing: '6px' }}>
            ADD CREATIVES
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            maxWidth: '820px',
          }}
        >
          <div
            style={{
              fontSize: title.length > 60 ? '52px' : '64px',
              fontWeight: 800,
              lineHeight: 1.1,
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: '26px', opacity: 0.85, marginTop: '20px' }}>
            Digital Solutions That Drive Growth
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
            fontSize: '22px',
            opacity: 0.9,
          }}
        >
          <span>www.addcreatives.com</span>
          <span>Lahore, Pakistan</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
