import React, { useEffect } from 'react';

const CryptoMarketScreener = () => {
  useEffect(() => {
    try {
      const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js';
    script.async = true;
    script.innerHTML = `
      {
        "width": "100%",
        "height": "100%",
        "defaultColumn": "performance",
        "screener_type": "crypto_mkt",
        "displayCurrency": "USD",
        "colorTheme": "dark",
        "locale": "tr",
        "isTransparent": true
      }
    `;
    document.getElementById('crypto-market-screener-widget').appendChild(script);

    return () => {
      document.getElementById('crypto-market-screener-widget').innerHTML = '';
    };
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div id="crypto-market-screener-widget" className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a href="https://tr.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="blue-text">Tüm piyasaları TradingView üzerinden takip edin</span>
        </a>
      </div>
    </div>
  );
};

export default CryptoMarketScreener;
