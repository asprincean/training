import React, { useState, useEffect, useRef } from 'react';

const useWebsocket = () => {
  const [currencyList, setCurrencyList] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8000/websocket');
    ws.current.onopen = () => console.log('ws opened');
    ws.current.onclose = () => console.log('ws closed');

    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      /* console.log(data); */
      setCurrencyList(data);
    };

    const wsCurrent = ws.current;

    return () => {
      wsCurrent.close();
    };
  }, []);

  /*   const sendMessage = () => {
    ws.current.send(JSON.stringify('Test'));
  }; */

  return { currencyList: currencyList };
};

export default useWebsocket;
