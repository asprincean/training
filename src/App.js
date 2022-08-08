import styled from 'styled-components';
import KpiList from './components/KpiList';
import Timeline from './components/Timeline';

function App() {
  return (
    <StyledWrapper className="App">
      <Timeline />
      <KpiList />
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
