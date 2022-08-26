import React, { useState, useCallback } from 'react';

const useChartTooltip = () => {
  const [tooltipData, setTooltipData] = useState({
    visible: false,
  });

  const handleTooltipShow = useCallback(
    (e, d) => {
      let data = d;

      data.visible = true;
      data.elementRect = e.target.getBoundingClientRect();
      setTooltipData(data);
    },
    [setTooltipData]
  );
  const handleTooltipHide = useCallback(
    () => setTooltipData({ ...tooltipData, visible: false }),
    [setTooltipData, tooltipData]
  );
  return {
    tooltipData,
    handleTooltipShow,
    handleTooltipHide,
  };
};

export default useChartTooltip;
