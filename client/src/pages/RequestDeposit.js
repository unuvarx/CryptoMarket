import React, { useState, useEffect, useContext } from "react";
import Context from "../context/ContextApi";
import { useIsAuthenticated } from "react-auth-kit";

export default function RequestDeposit() {
  const isAuthenticated = useIsAuthenticated();
  const { getUserInfo } = useContext(Context);
  const [avatar, setAvatar] = useState("");
  const [balance, setBalance] = useState(0);
  const [user, setUser] = useState([]);
  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
    try {
      if (isAuthenticated()) {
        getUserInfo(setUser, setAvatar, setBalance);
      }

      if (user?.depositMoney) {
        setDeposits(user?.depositMoney);
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
                <th scope="col">Banka Adı</th>
                <th scope="col">Ad Soyad</th>
                <th scope="col">TL Miktarı</th>
                <th scope="col">Durum</th>
                <th scope="col">Red Nedeni</th>

                <th scope="col">Çekim Tarihi</th>
              </tr>
            </thead>
            <tbody>
              {deposits.map((item) => (
                <tr key={item?._id}>
                  <td>{item?.bank}</td>
                  <td>
                    {user?.name} {user?.surname}
                  </td>
                  <td>{item?.amount}</td>
                  <td>{item?.state}</td>
                  <td>{item?.reason}</td>

                  <td>{item?.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
