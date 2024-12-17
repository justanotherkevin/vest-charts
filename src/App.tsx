import styled from "styled-components";
import "./App.css";
import TradingView from "./components/TradingView";
import { colors } from "./components/styles/theme";
import { Flex } from "./components/styles/utility";

const AppContainer = styled.div`
  ${Flex};
  background: ${colors.bg.primary};
  color: #ffffff;
`;

function App() {
  return (
    <AppContainer>
      <TradingView />
    </AppContainer>
  );
}

export default App;
