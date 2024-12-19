import { Time } from "lightweight-charts";

export function parseISODateToChartTime(isoString: string): Time {
  const date = new Date(isoString);
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1, // +1 because getMonth() returns 0-11
    day: date.getUTCDate(),
  };
}
