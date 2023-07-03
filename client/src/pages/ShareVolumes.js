import React from "react";
import ScreenerWidget from "../widgets/ScreenerWidget";

export default function ShareVolumes() {
  return (
    <div className="share-volume-page">
      <div className="share-volume-container">
        <ScreenerWidget />
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
