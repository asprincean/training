import styled from 'styled-components';
import { useRef } from 'react';
import Kpi from './Kpi';
import currencyList from './../data/kpiData';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

function KpiList() {
  const slideLeft = () => {
    inputRef.current.scrollLeft = inputRef.current.scrollLeft + 500;
  };
  const slideRight = () => {
    inputRef.current.scrollLeft = inputRef.current.scrollLeft - 500;
  };
  const inputRef = useRef(null);

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
    <StyledWrapper>
      <StyledSlider ref={inputRef}>
        {currencyList.map((currency) => (
          <Kpi currency={currency} key={currency.id} />
        ))}
      </StyledSlider>
      <StyledChevronGradientContainerLeft>
        <Gradient orientation="left" />
      </StyledChevronGradientContainerLeft>
      <StyledChevronLeft className="left" onClick={slideRight} />
      <StyledChevronGradientContainerRight>
        <Gradient orientation="right" />
      </StyledChevronGradientContainerRight>
      <StyledChevronRight className="right" onClick={slideLeft} />
    </StyledWrapper>
  );
}

export default KpiList;

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  min-height: auto;
  padding: 25px 40px 25px 40px;
  max-width: 100vw;
  background-color: #253038;
  color: white;
`;

const StyledSlider = styled.div`
  width: 100%;
  height: 100%;
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
  left: 25px;
  font-size: 50px;
  background-color: #253038;
  border: 1px solid #ffffff;
  height: 153px;
  width: 30px;
  margin-right: 15px;
  cursor: pointer;
  box-shadow: 5px 0px 15px #00000082;
  transition: 0.3s;
  :hover {
    opacity: 0.6;
    transform: scale(1.2);
  }
`;

const StyledChevronRight = styled(MdChevronRight)`
  position: absolute;
  right: 25px;
  margin: auto;
  font-size: 50px;
  background-color: #253038;
  border: 1px solid #ffffff;
  height: 153px;
  width: 30px;
  cursor: pointer;
  margin-left: 15px;
  /* box-shadow: -5px 0px 15px #00000082; */
  transition: 0.3s;
  :hover {
    opacity: 0.6;
    transform: scale(1.2);
  }
`;

const StyledChevronGradientContainerLeft = styled.div`
  position: absolute;
  left: 25px;
  height: 100%;
  display: flex;
`;

const StyledChevronGradientContainerRight = styled.div`
  position: absolute;
  right: 25px;
  height: 100%;
  display: flex;
`;
