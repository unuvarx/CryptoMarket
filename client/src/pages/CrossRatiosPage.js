import React from "react";
import ForexCrossRatesWidget from "../widgets/ForexCrossRatesWidget";

export default function () {
  return (
    <div className="cross-ratios-container">
      <div className="cross-ratios">
        <ForexCrossRatesWidget />
      </div>
      <div className="market-processes">
        <div>
          <h1>$850B</h1>
          <span>İşlem Hacmi</span>
        </div>
        <div>
          <h1>+7</h1>
          <span>Desteklenen Ülke</span>
        </div>
        <div>
          <h1>950B</h1>
          <span>Doğrulanmış Kullanıcılar</span>
        </div>
      </div>
    </div>
  );
}
