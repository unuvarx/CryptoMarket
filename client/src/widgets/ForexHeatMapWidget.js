import React, { useEffect } from "react";

const ForexHeatMapWidget = () => {
  useEffect(() => {
    try {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-forex-heat-map.js";
      script.async = true;
      script.innerHTML = `
      {
        "width": "100%",
        "height": "100%",
        "currencies": [
          "EUR",
          "USD",
          "JPY",
          "GBP",
          "CHF",
          "AUD",
          "CAD",
          "NZD",
          "CNY",
          "TRY",
          "SEK",
          "NOK",
          "DKK",
          "ZAR",
          "HKD",
          "SGD",
          "THB",
          "MXN",
          "IDR",
          "KRW",
          "PLN",
          "ISK",
          "KWD",
          "PHP",
          "MYR",
          "INR",
          "TWD",
          "SAR",
          "AED",
          "RUB",
          "ILS",
          "ARS",
          "CLP",
          "COP",
          "PEN",
          "UYU"
        ],
        "isTransparent": false,
        "colorTheme": "dark",
        "locale": "tr"
      }
    `;
      document.getElementById("tradingview-widget").appendChild(script);

      return () => {
        document.getElementById("tradingview-widget").innerHTML = "";
      };
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div id="tradingview-widget" className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright"></div>
    </div>
  );
};

export default ForexHeatMapWidget;
