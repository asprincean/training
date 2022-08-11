import styled from 'styled-components';
import { useRef } from 'react';
import Kpi from './Kpi';
import { default as mockCurrencyList } from './../data/kpiData';
import useWebsocket from '../utils/useWebsocket';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

function KpiList({ selectedCurrencyIds, setSelectedCurrencyIds }) {
  const { currencyList } = useWebsocket();
  // Define functions slideLeft & slideRight for scrolling to the right/left
  const slideLeft = () => {
    inputRef.current.scrollLeft = inputRef.current.scrollLeft + 500;
  };
  const slideRight = () => {
    inputRef.current.scrollLeft = inputRef.current.scrollLeft - 500;
  };
  const inputRef = useRef(null);
  // Define function to add gradient for ChevronLeft & ChevronRight instead of using boxShadow
  const Gradient = ({ orientation }) => {
    if (orientation === 'right') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="80px" height="100%">
          <defs>
            <linearGradient id="lgradright" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="rgb(37,48,56)" stopOpacity="0.16" />
              <stop offset="40%" stopColor="rgb(37,48,56)" stopOpacity="0.52" />
              <stop offset="100%" stopColor="rgb(37,48,56)" stopOpacity="1" />
            </linearGradient>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#lgradright)"
          />
        </svg>
      );
    }
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="80px" height="100%">
        <defs>
          <linearGradient id="lgradleft" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="rgb(37,48,56)" stopOpacity="1" />
            <stop offset="60%" stopColor="rgb(37,48,56)" stopOpacity="0.52" />
            <stop offset="100%" stopColor="rgb(37,48,56)" stopOpacity="0.16" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#lgradleft)" />
      </svg>
    );
  };

  return (
    <StyledContainer>
      {currencyList.length > 0 ? (
        <StyledSlider ref={inputRef}>
          {currencyList.map((currency) => (
            <Kpi
              currency={currency}
              key={currency.id}
              selectedCurrencyIds={selectedCurrencyIds}
              setSelectedCurrencyIds={setSelectedCurrencyIds}
            />
          ))}
        </StyledSlider>
      ) : (
        // probably needs to be replaced by a loading state?
        <StyledSlider ref={inputRef}>
          {mockCurrencyList.map((currency) => (
            <Kpi currency={currency} key={currency.id} />
          ))}
        </StyledSlider>
      )}
      <StyledChevronGradientContainerLeft>
        <Gradient orientation="left" />
      </StyledChevronGradientContainerLeft>
      <StyledChevronLeft className="left" onClick={slideRight} />
      <StyledChevronGradientContainerRight>
        <Gradient orientation="right" />
      </StyledChevronGradientContainerRight>
      <StyledChevronRight className="right" onClick={slideLeft} />
    </StyledContainer>
  );
}

export default KpiList;

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  margin: 1rem auto auto auto;
  width: 95vw;
  color: white;
`;

const StyledSlider = styled.div`
  width: 100%;
  height: 225px;
  display: flex;
  white-space: nowrap;
  overflow-x: scroll;
  scrollbar-width: none;
  scroll-behavior: smooth;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const StyledChevronLeft = styled(MdChevronLeft)`
  position: absolute;
  left: 0px;
  margin: auto;
  font-size: 50px;
  background-color: #253038;
  border: 1px solid #ffffff;
  height: 153px;
  width: 30px;
  margin-right: 15px;
  cursor: pointer;
  box-shadow: 5px 0px 15px #00000082;
  top: 50%;
  transform: translateY(-50%);
  transition: 0.3s;
  transform-origin: top;
  :hover {
    opacity: 0.6;
    transform: scale(1.1) translateY(-50%);
  }
`;

const StyledChevronRight = styled(MdChevronRight)`
  position: absolute;
  right: 0px;
  margin: auto;
  font-size: 50px;
  background-color: #253038;
  border: 1px solid #ffffff;
  height: 153px;
  width: 30px;
  cursor: pointer;
  margin-left: 15px;
  top: 50%;
  transform: translateY(-50%);
  transition: 0.3s;
  transform-origin: top;
  :hover {
    opacity: 0.6;
    transform: scale(1.1) translateY(-50%);
  }
`;

const StyledChevronGradientContainerLeft = styled.div`
  position: absolute;
  left: 0px;
  height: 100%;
  display: flex;
`;

const StyledChevronGradientContainerRight = styled.div`
  position: absolute;
  right: 0px;
  height: 100%;
  display: flex;
`;
