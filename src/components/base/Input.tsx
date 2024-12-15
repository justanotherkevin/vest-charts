import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { space } from "../styles/theme";
import { InputStyled } from "../styles/utility";

interface InputProps {
  label?: string;
  id?: string;
  placeholder?: string;
  rightPlaceholder?: string;
}
const InputWrapper = styled.div`
  position: relative;
  & .hasRightPlaceholder {
    padding-right: 60px;
  }
  .rightPlaceholder {
    position: absolute;
    top: 0;
    right: 0;
    transform: translateY(50%);
    padding-right: ${space.sm};
  }
`;
const InputCustom = styled.div``;
function Input({
  label = "Name",
  id = "name",
  placeholder,
  rightPlaceholder,
}: InputProps) {
  const [val, setVal] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setVal(e.target.value);
  };

  return (
    <InputCustom>
      <label htmlFor={id}>{label}:</label>
      <InputWrapper>
        <InputStyled
          className={rightPlaceholder && "hasRightPlaceholder"}
          placeholder={placeholder}
          type="text"
          id={id}
          value={val}
          onChange={handleChange}
        />
        {rightPlaceholder && (
          <span className="rightPlaceholder">{rightPlaceholder}</span>
        )}
      </InputWrapper>
    </InputCustom>
  );
}

export default Input;
