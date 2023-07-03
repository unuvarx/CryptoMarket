import React, { useEffect, useRef } from 'react';

const TickerWidget = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    try {
      const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-tickers.js';
    script.async = true;
    script.innerHTML = `
      {
        "symbols": [
          {
            "proName": "FOREXCOM:SPXUSD",
            "title": "SP 500"
          },
          {
            "proName": "FOREXCOM:NSXUSD",
            "title": "US 100"
          },
          {
            "proName": "FX_IDC:EURUSD",
            "title": "EUR/USD"
          },
          {
            "proName": "BITSTAMP:BTCUSD",
            "title": "Bitcoin"
          },
          {
            "proName": "BITSTAMP:ETHUSD",
            "title": "Ethereum"
          }
        ],
        "colorTheme": "dark",
        "isTransparent": false,
        "showSymbolLogo": true,
        "locale": "tr"
      }
    `;

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    
      <div className="tradingview-widget-container" ref={containerRef}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a href="https://tr.tradingview.com/" rel="noopener nofollow" target="_blank">
          
        </a>
      </div>
    </div>
    
  );
};

export default TickerWidget;