import React, { useState, useEffect, useContext } from "react";
import Context from "../context/ContextApi";
import { useIsAuthenticated } from "react-auth-kit";

export default function PastProcess() {
  const isAuthenticated = useIsAuthenticated();
  const { getUserInfo } = useContext(Context);
  const [avatar, setAvatar] = useState("");
  const [balance, setBalance] = useState(0);
  const [user, setUser] = useState([]);
  const [coinsProcess, setCoinsProcess] = useState([]);

  useEffect(() => {
    try {
      if (isAuthenticated()) {
        getUserInfo(setUser, setAvatar, setBalance);
      }

      if (user?.coins) {
        setCoinsProcess(user?.coinsProcess);
      }
    } catch (error) {
      console.log(error);
    }
  }, [user?.length]);

  return (
    <div className="col-md-12 col-lg-9">
      <div className="balances-container">
        <div className="balances-title">
          <span>Geçmiş İşlemler</span>
        </div>
        <div className="card-body">
          <table className="table table-borderless">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Alım/Satım Tarihi</th>
                <th scope="col">Coin</th>
                <th scope="col">Al/Sat</th>
                <th scope="col">Maaliyet</th>
                <th scope="col">Miktar</th>
              </tr>
            </thead>
            <tbody>
              {coinsProcess.map((item, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{item?.time}</td>
                  <td>{item?.shortName}</td>
                  <td>{item?.purchaseOrSale === "buy" ? "Al" : "Sat"}</td>
                  <td>{item?.price}</td>
                  <td>{item?.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
