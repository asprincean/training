import React, { useState, useCallback } from 'react';

const useChartTooltip = () => {
  const [tooltipData, setTooltipData] = useState({
    visible: false,
  });

  const handleTooltipShow = useCallback(
    (e, d) => {
      setTooltipData({
        visible: true,
        time: d.time,
        credit: d.credit,
        debit: d.debit,
        balance: d.balance,
        elementRect: e.target.getBoundingClientRect(),
      });
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
