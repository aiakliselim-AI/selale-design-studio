// Force rebuild 2026-05-06
// Cloudflare Pages Advanced Mode worker.
// Statik dosyalari env.ASSETS uzerinden servis eder ve guvenlik header'larini
// path'e gore set eder. Bu dosya `_headers`'in yerini alir; CF Workers ortaminda
// `_headers` okunmadigi icin tum kurallari burada toplariz.

const ADMIN_CSP = [
  "default-src 'self' https://unpkg.com https://*.githubusercontent.com https://api.github.com https://*.workers.dev https://github.com",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com https://static.cloudflareinsights.com",
  "script-src-elem 'self' 'unsafe-inline' https://unpkg.com https://static.cloudflareinsights.com",
  "worker-src 'self' blob:",
  "style-src 'self' 'unsafe-inline' https://unpkg.com https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https:",
  "connect-src 'self' https://api.github.com https://*.githubusercontent.com https://unpkg.com https://*.workers.dev https://github.com https://cloudflareinsights.com",
  "frame-src https://github.com",
].join("; ");

const PUBLIC_CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com",
  "script-src-elem 'self' 'unsafe-inline' https://static.cloudflareinsights.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https:",
  "connect-src 'self' https://wa.me https://cloudflareinsights.com",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "upgrade-insecure-requests",
].join("; ");

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const isAdmin = url.pathname === "/admin" || url.pathname.startsWith("/admin/");

    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);

    headers.set("Content-Security-Policy", isAdmin ? ADMIN_CSP : PUBLIC_CSP);
    headers.set("X-Frame-Options", "DENY");
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");

    if (!isAdmin) {
      headers.set("X-XSS-Protection", "1; mode=block");
      headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=()");
      headers.set("Cross-Origin-Opener-Policy", "same-origin");
      headers.set("Cross-Origin-Resource-Policy", "same-origin");
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
