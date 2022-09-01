import React from 'react';

const XAxis = ({
  dimensions,
  margin,
  scale,
  tickFormat,
  values,
  bandWidth,
}) => {
  const ticks = values;

  const formattedTicks = ticks.map((item) => ({
    value: tickFormat(item),
    offset: scale(item),
  }));

  return (
    <g transform={`translate(${margin.left}, ${margin.top})`}>
      
      {formattedTicks.map((item, index) => (
        <g
          key={`${item.value}-${index}`}
          transform={`translate(${item.offset}, ${
            dimensions.height - margin.top - margin.bottom
          })`}
        >
          <path
            key={item.value}
            transform={`translate(${bandWidth / 2}, 0 )`}
            d={['M', 0, 8, 'v', -8].join(' ')}
            fill="none"
            stroke="#6B6D6E"
          />
        
        </g>
      ))}
    </g>
  );
};

export default XAxis;
