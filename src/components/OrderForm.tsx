import { useState } from "react";
import LeverageSlider from "./base/Slider";
import * as S from "./styles/utility";

const OrderForm = () => {
  const [side, setSide] = useState<"LONG" | "SHORT">("LONG");
  const [leverage, setLeverage] = useState(2);

  // Mock data
  const mockData = {
    openPrice: "30,021.29",
    liquidationPrice: "300,212",
    slippage: "1.20",
    fee: "2.00",
  };

  return (
    <S.FormWrapper>
      <S.TabButtons>
        <S.TabButton
          fullLength={true}
          active={side === "LONG"}
          onClick={() => setSide("LONG")}
        >
          LONG
        </S.TabButton>
        <S.TabButton
          fullLength={true}
          active={side === "SHORT"}
          onClick={() => setSide("SHORT")}
        >
          SHORT
        </S.TabButton>
      </S.TabButtons>

      <S.Field>
        <S.Label>Order type</S.Label>
        <select defaultValue="MARKET">
          <option value="MARKET">MARKET</option>
          <option value="LIMIT">LIMIT</option>
        </select>
      </S.Field>

      <S.Field>
        <S.Label>Open Price</S.Label>
        <S.Value>{mockData.openPrice} USDC</S.Value>
      </S.Field>

      <div>
        <Input
          label="size"
          id="order-size"
          placeholder="0"
          rightPlaceholder="USDC"
        />

        <div>Up to 1,458.173</div>
      </S.Field>

      <S.Field>
        <S.Label>Leverage</S.Label>
        <S.Value>{leverage}.00X</S.Value>
        <LeverageSlider value={leverage} onChange={setLeverage} />
      </S.Field>

      <S.Field>
        <S.Label>Liquidation Price</S.Label>
        <S.Value>{mockData.liquidationPrice} USDC</S.Value>
      </S.Field>

      <S.Field>
        <S.Label>Slippage</S.Label>
        <S.Value>{mockData.slippage} USDC (0.3%)</S.Value>
      </S.Field>

      <S.Field>
        <S.Label>Fee</S.Label>
        <S.Value>{mockData.fee} USDC (0.05%)</S.Value>
      </S.Field>

      <S.Field>
        <S.Label>Advanced</S.Label>
        <select>
          <option value="">Select option</option>
        </select>
      </S.Field>

      <S.SubmitButton side={side}>BUY / {side}</S.SubmitButton>
    </S.FormWrapper>
  );
};
export default OrderForm;
