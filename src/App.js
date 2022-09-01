import styled from 'styled-components';
import KpiList from './components/KpiList';
import Timeline from './components/Timeline';
import ITF_Barchart from './components/ITF_barchart/ITF_Barchart';
import ITF_BarchartData from './data/ITF_BarchartData';
import { useState } from 'react';

function App() {
  const [selectedCurrencyIds, setSelectedCurrencyIds] = useState([]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <StyledWrapper className="App">
        <Timeline
          selectedCurrencyIds={selectedCurrencyIds}
          setSelectedCurrencyIds={setSelectedCurrencyIds}
        />
        <KpiList
          selectedCurrencyIds={selectedCurrencyIds}
          setSelectedCurrencyIds={setSelectedCurrencyIds}
        />
      </StyledWrapper>
      <ITF_Barchart data={ITF_BarchartData} />
    </div>
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
  margin: 12px;
  background-color: #253038;
  color: white;
`;
