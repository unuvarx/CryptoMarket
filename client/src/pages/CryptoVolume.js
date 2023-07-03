import React from "react";
import CryptoMarketScreenerWidget from "../widgets/CryptoMarketScreenerWidget";

export default function CryptoVolume() {
  return (
    <div className="crypto-volume-page">
      <div className="crypto-volume-container">
        <CryptoMarketScreenerWidget />
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
