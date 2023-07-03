import React from "react";
import SymbolOverview from "../widgets/SymbolOverview";


export default function Markets() {
  return (
    <div className="markets-page">
      <div className="markets-container">
        <h2>Piyasalar</h2>
        <div className="market">
          <SymbolOverview coin={"PHEMEX:BTCTRY"} />
        </div>
        <div className="market">
          <SymbolOverview coin={"BINANCE:USDTTRY"} />
        </div>
        <div className="market">
          <SymbolOverview coin={"BINANCE:DOGETRY"} />
        </div>
        <div className="market">
          <SymbolOverview coin={"BINANCE:LINKTRY"} />
        </div>
        <div className="market">
          <SymbolOverview coin={"BINANCE:BNBTRY"} />
        </div>
        <div className="market">
          <SymbolOverview coin={"BINANCE:XRPTRY"} />
        </div>
        <div className="market">
          <SymbolOverview coin={"BINANCE:TRXTRY"} />
        </div>
        <div className="market">
          <SymbolOverview coin={"BIST:SASA"} />
        </div>
        <div className="market">
          <SymbolOverview coin={"BIST:THYAO"} />
        </div>
        <div className="market">
          <SymbolOverview coin={"BIST:ASTOR"} />
        </div>
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
