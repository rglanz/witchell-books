export async function postAnalytics(path, data) {
  const { ANALYTICS_ORIGIN, ANALYTICS_BEARER_TOKEN } = process.env;
  if (!ANALYTICS_BEARER_TOKEN || !URL.canParse(ANALYTICS_ORIGIN)) {
    return null;
  }

  const origin = new URL(ANALYTICS_ORIGIN);
  if (origin.protocol !== "https:" || origin.href !== `${origin.origin}/`) {
    return null;
  }

  return fetch(new URL(path, origin), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${ANALYTICS_BEARER_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    redirect: "error",
    signal: AbortSignal.timeout(5000),
  });
}
