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
  return (
    <StyledWrapper>
      <StyledChevronLeft className="left" onClick={slideRight} />
      <StyledSlider ref={inputRef}>
        {currencyList.map((currency) => (
          <Kpi currency={currency} key={currency.id} />
        ))}
      </StyledSlider>
      <StyledChevronRight className="right" onClick={slideLeft} />
    </StyledWrapper>
  );
}

export default KpiList;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  min-height: auto;
  padding: 25px;
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
  font-size: 50px;
  background-color: #253038;
  border: 1px solid #ffffff;
  height: 153px;
  width: 30px;
  cursor: pointer;
  margin-left: 15px;
  box-shadow: -5px 0px 15px #00000082;
  transition: 0.3s;
  :hover {
    opacity: 0.6;
    transform: scale(1.2);
  }
`;
