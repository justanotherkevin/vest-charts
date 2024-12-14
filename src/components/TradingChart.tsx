import { createChart, UTCTimestamp } from "lightweight-charts";
import { useEffect, useRef } from "react";

// Mock data
const mockData = [
  {
    time: new Date("2024-01-16").getTime() as UTCTimestamp,
    open: 26660.6,
    high: 26660.64,
    low: 26660.55,
    close: 26660.59,
  },
  {
    time: new Date("2024-01-17").getTime() as UTCTimestamp,
    open: 26660.58,
    high: 26660.62,
    low: 26660.54,
    close: 26660.57,
  },
  {
    time: new Date("2024-01-18").getTime() as UTCTimestamp,
    open: 26660.57,
    high: 26660.63,
    low: 26660.56,
    close: 26660.6,
  },
  {
    time: new Date("2024-01-19").getTime() as UTCTimestamp,
    open: 26660.59,
    high: 26660.64,
    low: 26660.54,
    close: 26660.58,
  },
];
const TradingChart: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: "#1A1A1A" },
        textColor: "#DDD",
      },
      grid: {
        vertLines: { color: "#242424" },
        horzLines: { color: "#242424" },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    candlestickSeries.setData(mockData);

    // Add volume series
    const volumeSeries = chart.addHistogramSeries({
      color: "#26a69a",
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "", // Set as an overlay
    });

    const volumeData = mockData.map((item) => ({
      time: item.time,
      value: Math.random() * 100,
      color: item.open <= item.close ? "#26a69a" : "#ef5350",
    }));

    volumeSeries.setData(volumeData);

    // Cleanup
    return () => {
      chart.remove();
    };
  }, []);

  return (
    <div className="trading-chart">
      <div className="chart-controls">
        <button>1H</button>
        <button>4H</button>
        <button>1D</button>
        <button className="indicators-btn">INDICATORS</button>
      </div>
      <div ref={chartContainerRef} />
    </div>
  );
};

export default TradingChart;
