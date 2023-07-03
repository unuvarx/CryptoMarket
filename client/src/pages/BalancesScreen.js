import React, { useState, useEffect, useContext } from "react";
import Context from "../context/ContextApi";
import { useIsAuthenticated } from "react-auth-kit";

export default function BalancesScreen() {
  const isAuthenticated = useIsAuthenticated();
  const { getUserInfo } = useContext(Context);
  const [avatar, setAvatar] = useState("");
  const [balance, setBalance] = useState(0);
  const [user, setUser] = useState([]);
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    try {
      if (isAuthenticated()) {
        getUserInfo(setUser, setAvatar, setBalance);
      }
  
      if (user.coins) {
        setCoins(user.coins);
      }
    } catch (error) {
      console.log(error);
    }
  }, [user?.length]);

  return (
    <div className="col-md-12 col-lg-9">
      <div className="balances-container">
        <div className="balances-title">
          <span>Güncel Portföy</span>
          <span>
            {balance.toFixed(2)}TL
          </span>
        </div>
        <div className="card-body">
          <table className="table table-borderless">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Coin</th>
                <th scope="col">Miktar</th>
                <th scope="col">Maaliyet</th>
              </tr>
            </thead>
            <tbody>
              {coins?.map((coin, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{coin?.shortName}</td>
                  <td>{coin?.amount}</td>
                  <td>{coin?.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
