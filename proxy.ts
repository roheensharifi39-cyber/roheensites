import { NextResponse, type NextRequest } from "next/server";

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 120;
const MAX_BUCKETS = 5_000;
const buckets = new Map<string, { count: number; resetAt: number }>();
const allowedMethods = new Set(["GET", "HEAD", "OPTIONS"]);

function cleanHeaderValue(value: string | null) {
  return value?.replace(/[\r\n]/g, "").trim();
}

function clientKey(request: NextRequest) {
  const forwardedFor = cleanHeaderValue(request.headers.get("x-forwarded-for"))
    ?.split(",")[0]
    ?.trim();
  const realIp = cleanHeaderValue(request.headers.get("x-real-ip"));
  return forwardedFor || realIp || "anonymous";
}

function contentSecurityPolicy() {
  const isDev = process.env.NODE_ENV === "development";
  const directives = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "media-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "manifest-src 'self'",
    "worker-src 'self' blob:",
    ...(isDev ? [] : ["upgrade-insecure-requests"]),
  ];

  return directives.join("; ");
}

function securityHeaders(response: NextResponse) {
  response.headers.set("Content-Security-Policy", contentSecurityPolicy());
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()");
  response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  response.headers.set("Cross-Origin-Resource-Policy", "same-origin");
  response.headers.set("X-DNS-Prefetch-Control", "off");
  response.headers.set("X-Permitted-Cross-Domain-Policies", "none");
  return response;
}

function pruneBuckets(now: number) {
  if (buckets.size <= MAX_BUCKETS) return;

  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }

  if (buckets.size <= MAX_BUCKETS) return;

  for (const key of buckets.keys()) {
    buckets.delete(key);
    if (buckets.size <= MAX_BUCKETS) break;
  }
}

export function proxy(request: NextRequest) {
  if (!allowedMethods.has(request.method)) {
    return securityHeaders(
      new NextResponse("Method not allowed", {
        status: 405,
        headers: {
          Allow: "GET, HEAD, OPTIONS",
        },
      })
    );
  }

  if (request.method === "OPTIONS") {
    return securityHeaders(
      new NextResponse(null, {
        status: 204,
        headers: {
          Allow: "GET, HEAD, OPTIONS",
        },
      })
    );
  }

  const key = clientKey(request);
  const now = Date.now();
  pruneBuckets(now);

  const current = buckets.get(key);
  const bucket = current && current.resetAt > now ? current : { count: 0, resetAt: now + WINDOW_MS };

  bucket.count += 1;
  buckets.set(key, bucket);

  if (bucket.count > MAX_REQUESTS) {
    return securityHeaders(
      new NextResponse("Too many requests", {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((bucket.resetAt - now) / 1000)),
        },
      })
    );
  }

  const response = NextResponse.next();
  response.headers.set("RateLimit-Limit", String(MAX_REQUESTS));
  response.headers.set("RateLimit-Remaining", String(Math.max(0, MAX_REQUESTS - bucket.count)));
  response.headers.set("RateLimit-Reset", String(Math.ceil(bucket.resetAt / 1000)));

  return securityHeaders(response);
}

export const config = {
  matcher: [
    {
      source:
        "/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|images/|.*\\.svg|robots.txt|sitemap.xml|google34a18f6759cb1666.html).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
