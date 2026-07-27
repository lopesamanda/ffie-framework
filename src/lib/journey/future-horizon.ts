/** User-facing horizon copy for the Create journey (not fixed 2036). */
export const FUTURE_HORIZON_LABEL = "10 years from now";

/** Stored `year` column value — current calendar year + 10. */
export function getFutureHorizonYear(from = new Date()): number {
  return from.getFullYear() + 10;
}
