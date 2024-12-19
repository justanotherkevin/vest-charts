import {
  createChart,
  IChartApi,
  ISeriesApi,
  SeriesMarker,
  Time,
  UTCTimestamp,
} from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import { CANDLE_STYLE, CHART_CONFIG } from "../../data/constants";
import { useHistoricalData } from "../../hooks/useHistoricalData";
import { useReactions } from "../../hooks/useReactions";

interface CandleData {
  time: Time;
  open: number;
  high: number;
  low: number;
  close: number;
}
type EmojiReactions = {
  [date: string]: Reaction[];
};
type Reaction = {
  userId: string;
  emoji: string;
};
// Helper function
function parseISODate(isoString: string) {
  const date = new Date(isoString);
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1, // +1 because getMonth() returns 0-11
    day: date.getUTCDate(),
  };
}
function createMarkers(reactions: EmojiReactions): SeriesMarker<Time>[] {
  const newMarkers = [];
  for (let emojiReaction in reactions) {
    const { year, month, day } = parseISODate(emojiReaction);
    const usersReaction = reactions[emojiReaction];
    const allEmoji = usersReaction.reduce(
      (combineString, user) => combineString + " " + user.emoji,
      ""
    );
    const data = {
      time: { year, month, day } as Time,
      position: "aboveBar",
      color: "#f210f6",
      shape: "circle",
      text: `initial markerrrrrrr ${allEmoji}`,
    } as SeriesMarker<Time>;
    newMarkers.push(data);
  }
  return newMarkers;
}
const ETHChart = () => {
  const chartHtmlRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const [candleSeries, setCandleSeries] =
    useState<ISeriesApi<"Candlestick"> | null>(null);
  const {
    reactions,
    loading: reactionsLoading,
    error: reactionError,
  } = useReactions();
  const {
    data: ethData,
    loading: dataLoading,
    error: dataError,
  } = useHistoricalData({
    symbol: "ETH-PERP",
  });

  useEffect(() => {
    if (!chartHtmlRef.current) return;
    // Initialize chart
    const chart = createChart(chartHtmlRef.current, CHART_CONFIG);
    chartRef.current = chart;

    const series = chart.addCandlestickSeries(CANDLE_STYLE);
    seriesRef.current = series;
    setCandleSeries(series);

    // Setup WebSocket
    // setupWebSocket(series);

    const handleResize = () => {
      if (chartRef.current && chartHtmlRef.current) {
        chartRef.current.applyOptions({
          width: chartHtmlRef.current.clientWidth,
        });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      chart.remove();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (reactionsLoading || !seriesRef.current) return;
    const markers = createMarkers(reactions);
    seriesRef.current.setMarkers(markers);
  }, [reactions]);

  useEffect(() => {
    if (dataLoading || !seriesRef.current) return;
    seriesRef.current.setData(ethData);
  }, [ethData]);

  const setupWebSocket = (series: ISeriesApi<"Candlestick">) => {
    const ws = new WebSocket(
      "wss://devws.vest.exchange/ws-api?version=1.0&xwebsocketserver=restserver0"
    );
    wsRef.current = ws;

    const testmsg = { method: "PING", params: [], id: 1 };

    ws.onopen = () => {
      console.log("WebSocket Connected");
      // Subscribe to ETH-PERP kline stream
      ws.send(
        // JSON.stringify({
        //   method: "SUBSCRIBE",
        //   params: ["ETH-PERP@kline_1m"],
        //   id: 1,
        // })
        JSON.stringify(testmsg)
      );
    };

    ws.onmessage = (event: MessageEvent) => {
      console.log(event);
      const data = JSON.parse(event.data);

      if (data.channel === "ETH-PERP@kline_1m") {
        const [time, open, high, low, close]: [
          UTCTimestamp,
          string,
          string,
          string,
          string
        ] = data.data;
        const candleData: CandleData = {
          time: time,
          open: parseFloat(open),
          high: parseFloat(high),
          low: parseFloat(low),
          close: parseFloat(close),
        };
        series.update(candleData);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
      // Attempt to reconnect after 5 seconds
      setTimeout(() => setupWebSocket(series), 5000);
    };
  };

  return (
    <div>
      <div ref={chartHtmlRef} />
    </div>
  );
};

export default ETHChart;
