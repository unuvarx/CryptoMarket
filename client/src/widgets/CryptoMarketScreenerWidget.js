import React, { useEffect } from "react";

const CryptoMarketScreenerWidget = () => {
  useEffect(() => {
    try {
      let script = document.getElementById("tradingview-widget-script");
      if (!script) {
        script = document.createElement("script");
        script.id = "tradingview-widget-script";
        script.src =
          "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
        script.async = true;
        script.innerHTML = `
        {
          "width": "100%",
          "height": "100%",
          "defaultColumn": "performance",
          "screener_type": "crypto_mkt",
          "displayCurrency": "BTC",
          "colorTheme": "dark",
          "locale": "tr",
          "isTransparent": false
        }
      `;

        document.getElementById("tradingview-widget").appendChild(script);
      }

      return () => {
        if (
          script &&
          script.parentNode === document.getElementById("tradingview-widget")
        ) {
          document.getElementById("tradingview-widget").removeChild(script);
        }
      };
    } catch (error) {
      console.log(error);
    }
  }, []);

  return <div id="tradingview-widget" />;
};

export default CryptoMarketScreenerWidget;
