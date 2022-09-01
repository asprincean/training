import React from 'react';

const Connector = ({
  data,
  xScale,
  yScale,
  connectorWidth,
  bandWidth,
  index,
  lastIndex,
}) => {

  const y = yScale(data.balance);
  const x = xScale(data.account) + bandWidth;

  if (index === lastIndex) {
    return null;
  }

  return (
    <path
      d={['M', x + 5, y, 'h', connectorWidth - 10].join(' ')}
      stroke={'white'}
      strokeDasharray="10,10"
      strokeWidth="2"
    />
  );
};

export default Connector;
