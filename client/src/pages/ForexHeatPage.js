import React from 'react'
import ForexHeatMapWidget from '../widgets/ForexHeatMapWidget';

export default function ForexHeatPage() {
  return (
    <div className="heat-map-container">
      <div className="heat-map">
        <ForexHeatMapWidget />
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
  )
}
