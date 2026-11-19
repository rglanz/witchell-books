import { postAnalytics } from "../lib/analytics.mjs";

export default async function pageview(request) {
  if (request.method !== "POST") {
    return new Response(null, { status: 405, headers: { Allow: "POST" } });
  }

  if (request.headers.get("Origin") !== new URL(request.url).origin) {
    return new Response(null, { status: 403 });
  }

  const pageview = await request.json().catch(() => null);
  const path = pageview?.path;

  if (
    typeof path !== "string" ||
    path.length > 2048 ||
    !path.startsWith("/") ||
    path.startsWith("//") ||
    /[?#\s\\]/.test(path)
  ) {
    return new Response(null, { status: 400 });
  }

  try {
    const result = await postAnalytics("/webhooks/visits", { path });
    if (!result) {
      console.log("Pageview webhook configuration is missing or invalid");
      return new Response(null, { status: 503 });
    }

    return new Response(null, { status: result.ok ? 204 : 502 });
  } catch {
    return new Response(null, { status: 502 });
  }
}
