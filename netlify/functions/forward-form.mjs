import { postAnalytics } from "../lib/analytics.mjs";

export default {
  async formSubmitted(event) {
    const result = await postAnalytics("/webhooks/forms", event.data);
    if (!result) {
      throw new Error("Form webhook configuration is missing or invalid");
    }
    if (!result.ok) {
      throw new Error(`Form webhook returned HTTP ${result.status}`);
    }
  },
};
