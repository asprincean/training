import styled from 'styled-components';
import KpiList from './components/KpiList';
import Timeline from './components/Timeline';
import { useState } from 'react';
import BarChart from './components/barchart';

function App() {
  const [selectedCurrencyIds, setSelectedCurrencyIds] = useState([]);
  
  return (
    <StyledWrapper className="App">
      <Timeline
        selectedCurrencyIds={selectedCurrencyIds}
        setSelectedCurrencyIds={setSelectedCurrencyIds}
      />
      <KpiList
        selectedCurrencyIds={selectedCurrencyIds}
        setSelectedCurrencyIds={setSelectedCurrencyIds}
      />
      <BarChart/>
    </StyledWrapper>
  );
}

export default App;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  height: auto;
  max-width: 100vw;
  padding: 25px;
  background-color: #253038;
  color: white;
`;
