import React from "react";
import TechnicalAnalysisWidget from "../widgets/TechnicalAnalysisWidget";

export default function CryptoTechnicalAnalysis() {
  return (
    <div className="technical-analysis-page">
      <div className="container-fluid mtb15 no-fluid">
        <div className="row">
          <div className="col-md-4">
            <TechnicalAnalysisWidget coin={"BINANCE:BTCTRY"} />
          </div>
          <div className="col-md-4">
            <TechnicalAnalysisWidget coin={"BINANCE:USDTTRY"} />
          </div>
          <div className="col-md-4">
            <TechnicalAnalysisWidget coin={"BINANCE:DOGETRY"} />
          </div>
          <div className="col-md-4">
            <TechnicalAnalysisWidget coin={"BINANCE:ETHTRY"} />
          </div>
          <div className="col-md-4">
            <TechnicalAnalysisWidget coin={"BINANCE:LINKTRY"} />
          </div>
          <div className="col-md-4">
            <TechnicalAnalysisWidget coin={"BINANCE:BNBTRY"} />
          </div>
          <div className="col-md-4">
            <TechnicalAnalysisWidget coin={"BINANCE:XRPTRY"} />
          </div>
          <div className="col-md-4">
            <TechnicalAnalysisWidget coin={"BINANCE:TRXTRY"} />
          </div>
          <div className="col-md-4">
            <TechnicalAnalysisWidget coin={"BIST:SASA"} />
          </div>
          <div className="col-md-4">
            <TechnicalAnalysisWidget coin={"BIST:THYAO"} />
          </div>
          <div className="col-md-4">
            <TechnicalAnalysisWidget coin={"BIST:ASTOR"} />
          </div>
          <div className="col-md-4">
            <TechnicalAnalysisWidget coin={"NASDAQ:TSLA"} />
          </div>
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
