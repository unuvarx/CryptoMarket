import React, { useEffect } from "react";

const ScreenerWidget = () => {
  useEffect(() => {
    try {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        width: "100%",
        height: "100%",
        defaultColumn: "overview",
        defaultScreen: "general",
        market: "crypto",
        showToolbar: true,
        colorTheme: "dark",
        locale: "tr",
      });
      document.getElementById("screener-widget-container").appendChild(script);

      return () => {
        document
          .getElementById("screener-widget-container")
          .removeChild(script);
      };
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div
      id="screener-widget-container"
      className="tradingview-widget-container"
    ></div>
  );
};

export default ScreenerWidget;
