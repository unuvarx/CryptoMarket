
import React, { useEffect, useRef } from 'react';

const TechnicalAnalysisWidget = ({coin}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    try {
      const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js';
    script.async = true;
    script.innerHTML = `
      {
        "interval": "1m",
        "width": "100%",
        "isTransparent": false,
        "height": "500",
        "symbol": "${coin}",
        "showIntervalTabs": true,
        "locale": "tr",
        "colorTheme": "dark"
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
    <div id="tradingview-widget" className="tradingview-widget-container" ref={containerRef}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a href="https://tr.tradingview.com/" rel="noopener nofollow" target="_blank">
        </a>
      </div>
    </div>
  );
};

export default TechnicalAnalysisWidget;