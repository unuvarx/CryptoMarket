// TradingViewWidget.jsx

import React, { useEffect, useRef } from "react";

let tvScriptLoadingPromise;

export default function TradingViewWidget() {
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
          document.getElementById("tradingview_0f1e1") &&
          "TradingView" in window
        ) {
          new window.TradingView.widget({
            autosize: true,
            symbol: "BITFINEX:BTCTRY",
            interval: "D",
            timezone: "Etc/UTC",
            theme: "dark",
            style: "3",
            locale: "tr",
            toolbar_bg: "#f1f3f6",
            enable_publishing: false,
            hide_top_toolbar: true,
            hide_legend: true,
            save_image: false,
            container_id: "tradingview_0f1e1",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div id="tradingview_0f1e1" />
    </div>
  );
}
