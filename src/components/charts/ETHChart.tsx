import {
  createChart,
  IChartApi,
  ISeriesApi,
  SeriesMarker,
  Time,
  UTCTimestamp,
} from "lightweight-charts";
import { useEffect, useRef } from "react";
import { CANDLE_STYLE, CHART_CONFIG } from "../../data/constants";
import { useHistoricalData } from "../../hooks/useHistoricalData";
import { EmojiReactions, useReactions } from "../../hooks/useReactions";
import { parseISODateToChartTime } from "../../utils/dateHelper";

interface CandleData {
  time: Time;
  open: number;
  high: number;
  low: number;
  close: number;
}

function createMarkers(reactions: EmojiReactions): SeriesMarker<Time>[] {
  return Object.entries(reactions).map(([date, usersReaction]) => ({
    time: parseISODateToChartTime(date),
    position: "aboveBar",
    color: "#f210f6",
    shape: "circle",
    text: `${usersReaction.map((u) => u.emoji).join(" ")}`,
  }));
}
const ETHChart = () => {
  const chartHtmlRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

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

  return <div ref={chartHtmlRef} />;
};

export default ETHChart;
