import { RatingTier } from "@/types/ratingTier";

export const RATING_TIERS: RatingTier[] = [
  { minPercent: 0, maxPercent: 10, titleKey: "tiers.tier1.title", descriptionKey: "tiers.tier1.description" },
  { minPercent: 11, maxPercent: 30, titleKey: "tiers.tier2.title", descriptionKey: "tiers.tier2.description" },
  { minPercent: 31, maxPercent: 50, titleKey: "tiers.tier3.title", descriptionKey: "tiers.tier3.description" },
  { minPercent: 51, maxPercent: 70, titleKey: "tiers.tier4.title", descriptionKey: "tiers.tier4.description" },
  { minPercent: 71, maxPercent: 90, titleKey: "tiers.tier5.title", descriptionKey: "tiers.tier5.description" },
  { minPercent: 91, maxPercent: 100, titleKey: "tiers.tier6.title", descriptionKey: "tiers.tier6.description" },
];

export function getRatingTier(percent: number): RatingTier {
  const tier = RATING_TIERS.find((t) => percent >= t.minPercent && percent <= t.maxPercent);
  return tier ?? RATING_TIERS[0];
}