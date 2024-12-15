import styled from "styled-components";

const SliderContainer = styled.div`
  margin: 20px 0;
`;

const Marks = styled.div`
  display: flex;
  justify-content: space-between;
  color: #888;
  margin-top: 8px;
`;

const Range = styled.input`
  width: 100%;
  -webkit-appearance: none;
  height: 4px;
  background: #333;
  border-radius: 2px;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    background: #fff;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const marks = ["2X", "5X", "10X", "25X", "50X", "100X", "125X"];

const LeverageSlider = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (val: number) => void;
}) => (
  <SliderContainer>
    <Range
      type="range"
      min={2}
      max={125}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    />
    <Marks>
      {marks.map((mark) => (
        <span key={mark}>{mark}</span>
      ))}
    </Marks>
  </SliderContainer>
);
export default LeverageSlider;
