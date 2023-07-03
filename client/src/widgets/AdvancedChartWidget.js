// AdvancedChartWidget.jsx

import React, { useEffect, useRef } from "react";

let tvScriptLoadingPromise;

export default function AdvancedChartWidget() {
  const onLoadScriptRef = useRef();

  useEffect(() => {
    try {
      onLoadScriptRef.current = createWidget;

      if (!tvScriptLoadingPromise) {
        tvScriptLoadingPromise = new Promise((resolve) => {
          const script = document.createElement("script");
          script.id = "tradingview-widget-loading-script";
          script.src = "https://s3.tradingview.com/tv.js";
          script.type = "text/javascript";
          script.onload = resolve;

          document.head.appendChild(script);
        });
      }

      tvScriptLoadingPromise.then(
        () => onLoadScriptRef.current && onLoadScriptRef.current()
      );

      return () => (onLoadScriptRef.current = null);

      function createWidget() {
        if (
          document.getElementById("tradingview_0cc3a") &&
          "TradingView" in window
        ) {
          new window.TradingView.widget({
            autosize: true,
            symbol: "CRYPTOCAP:DOGE",
            interval: "D",
            timezone: "Etc/UTC",
            theme: "dark",
            style: "1",
            locale: "tr",
            toolbar_bg: "#f1f3f6",
            enable_publishing: false,
            allow_symbol_change: true,
            container_id: "tradingview_0cc3a",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div id="tradingview_0cc3a" />
      <div className="tradingview-widget-copyright"></div>
    </div>
  );
}
