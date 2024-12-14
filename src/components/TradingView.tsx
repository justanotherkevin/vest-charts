import OrderForm from "./OrderForm";
import TradingChart from "./TradingChart";
import TradingHeader from "./TradingHeader";

const TradingView = () => (
  <div className="trading-view">
    <TradingHeader
      symbol="BTC/BITCOIN"
      price={31119.01}
      change24h="+22.3 USDC (+7.5%)"
      funding="0.00012%"
      longInterest="8.871 BTC"
      shortInterest="8.871 BTC"
    />
    <div className="trading-content">
      <div className="chart-section">
        <TradingChart />
      </div>
      <div className="order-section">
        <OrderForm side="LONG" />
      </div>
    </div>
  </div>
);
export default TradingView;
