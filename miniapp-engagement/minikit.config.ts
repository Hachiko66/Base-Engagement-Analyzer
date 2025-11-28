const ROOT_URL =
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');

/**
 * MiniApp configuration object. Must follow the Farcaster MiniApp specification.
 *
 * @see {@link https://miniapps.farcaster.xyz/docs/guides/publishing}
 */
export const minikitConfig = {
  accountAssociation: {
    header: "",
    payload: "",
    signature: ""
  },
  miniapp: {
    version: "1",
    name: "Engagement Tracker", 
    subtitle: "Farcaster Account Analytics", 
    description: "Track engagement metrics for your Farcaster account",
    screenshotUrls: [`${ROOT_URL}/screenshot-portrait.png`],
    iconUrl: `${ROOT_URL}/blue-icon.png`,
    splashImageUrl: `${ROOT_URL}/blue-hero.png`,
    splashBackgroundColor: "#000000",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "social",
    tags: ["social", "analytics", "engagement", "farcaster", "metrics"],
    heroImageUrl: `${ROOT_URL}/blue-hero.png`, 
    tagline: "Analyze your Farcaster engagement metrics",
    ogTitle: "Engagement Tracker - Farcaster Analytics",
    ogDescription: "Track your Farcaster engagement metrics including Neynar Score, posts, likes, and comments",
    ogImageUrl: `${ROOT_URL}/blue-hero.png`,
  },
} as const;

