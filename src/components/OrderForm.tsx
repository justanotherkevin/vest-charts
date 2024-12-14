interface OrderFormProps {
  side: "LONG" | "SHORT";
}

const OrderForm = ({ side }: OrderFormProps) => (
  <div className="order-form">
    <div className="order-type">
      <select defaultValue="MARKET">
        <option value="MARKET">MARKET</option>
        <option value="LIMIT">LIMIT</option>
      </select>
    </div>
    <div className="order-inputs">
      <input type="number" placeholder="Size" />
      <div className="leverage-slider">
        <input type="range" min="1" max="125" />
      </div>
      <div className="order-info">
        <span>Liquidation Price: $300,212 USDC</span>
        <span>Slippage: 1.20 USDC (0.3%)</span>
        <span>Fee: 2.00 USDC (0.05%)</span>
      </div>
    </div>
    <button className={`submit-btn ${side.toLowerCase()}`}>BUY / {side}</button>
  </div>
);
export default OrderForm;
