import { useState } from "react";
import styled from "styled-components";
import Input from "./base/Input";
import LeverageSlider from "./base/Slider";
import { colors, space } from "./styles/theme";
import * as S from "./styles/utility";

const Row = styled.div`
  ${S.Flex}
  justify-content: space-between;
`;

const OrderFormContainer = styled.div`
  ${S.BaseContainer}
  color: ${colors.text.secondary};
  > * {
    margin-bottom: ${space.md};
  }
`;

const randonWidth = {
  width: "84px",
};

const FeedsAndMis = styled.div`
  & > * {
    margin-bottom: ${space.xs};
  }
`;

const PrimaryText = styled.div`
  color: ${colors.text.primary};
`;

const SecondaryText = styled.div`
  color: ${colors.text.secondary};
`;

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
    <OrderFormContainer>
      <S.TabButtons>
        <S.TabButton
          fullLength={true}
          active={`${side === "LONG"}`}
          onClick={() => setSide("LONG")}
        >
          LONG
        </S.TabButton>
        <S.TabButton
          fullLength={true}
          active={`${side === "SHORT"}`}
          onClick={() => setSide("SHORT")}
        >
          SHORT
        </S.TabButton>
      </S.TabButtons>

      <Row>
        <div>
          <div>Order type</div>
          <S.Dropdown defaultValue="market">
            <option>market</option>
            <option>limit</option>
            <option>stop</option>
          </S.Dropdown>
        </div>

        <div style={randonWidth}>
          <div>Open Price</div>
          <S.Value>{mockData.openPrice} USDC</S.Value>
        </div>
      </Row>

      <div>
        <Input
          label="size"
          id="order-size"
          placeholder="0"
          rightPlaceholder="USDC"
        />
        <div>Up to 1,458.173</div>
      </div>
      {/* Leavage */}
      <div>
        <LeverageSlider value={leverage} onChange={setLeverage} />
      </div>
      {/* fees and mis cost */}
      <FeedsAndMis>
        <Row>
          <SecondaryText>Liquidation Price</SecondaryText>
          <PrimaryText>{mockData.liquidationPrice} USDC</PrimaryText>
        </Row>

        <Row>
          <SecondaryText>Slippage</SecondaryText>
          <PrimaryText>{mockData.slippage} USDC (0.3%)</PrimaryText>
        </Row>

        <Row>
          <SecondaryText>Fee</SecondaryText>
          <PrimaryText>{mockData.fee} USDC (0.05%)</PrimaryText>
        </Row>
      </FeedsAndMis>

      <div>
        <S.Dropdown defaultValue="Advanced" value="advanced" widthSize="full">
          <option>Advanced</option>
        </S.Dropdown>
      </div>

      <S.SubmitButton side={side}>BUY / {side}</S.SubmitButton>
    </OrderFormContainer>
  );
};
export default OrderForm;
