import { UTCTimestamp } from "lightweight-charts";
import { useEffect, useState } from "react";

type CandleData = {
  time: UTCTimestamp;
  open: number;
  high: number;
  low: number;
  close: number;
};

interface HistoricalDataParams {
  symbol: string;
  interval?: string;
  limit?: number;
}

export const useHistoricalData = ({
  symbol,
  interval = "1m",
  limit = 1000,
}: HistoricalDataParams) => {
  const [data, setData] = useState<CandleData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = new URL("https://server-mmdev.vest.exchange/v2/klines");
        url.searchParams.set("symbol", symbol);
        url.searchParams.set("interval", interval);
        url.searchParams.set("limit", limit.toString());

        const res = await fetch(url.toString());
        const rawData: [UTCTimestamp, string, string, string, string][] =
          await res.json();

        setData(
          rawData.map(([t, o, h, l, c]) => ({
            time: t,
            open: +o,
            high: +h,
            low: +l,
            close: +c,
          }))
        );
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol, interval, limit]);

  return { data, loading, error };
};
