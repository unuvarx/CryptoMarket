import React, { useState, useEffect, useContext } from "react";
import Context from "../context/ContextApi";
import { useIsAuthenticated } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

export default function WithdrawMoney() {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const { getUserInfo, withdrawReq } = useContext(Context);
  const [avatar, setAvatar] = useState("");
  const [balance, setBalance] = useState(0);
  const [user, setUser] = useState([]);
  const [bank, setBank] = useState("Türkiye Cumhuriyeti Ziraat Bankası");
  const [iban, setIban] = useState("");
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  useEffect(() => {
    try {
      if (isAuthenticated()) {
        getUserInfo(setUser, setAvatar, setBalance);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }, [user?.length]);

  const handleClick = () => {
    try {
      if (isAuthenticated()) {
        withdrawReq(user?._id, bank, iban, amount, desc);
        setBank("Türkiye Cumhuriyeti Ziraat Bankası");
        setIban("");
        setAmount("");
        setDesc("");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col-md-12 col-lg-9">
      <div className="balances-container">
        <div className="balances-title">
          <span>Para Çek</span>
          <span>{balance.toFixed(2)}TL</span>
        </div>
        <div className="withdraw-money-warning">
          <span>Not: </span>

          <label htmlFor="">
            Lütfen aşağıda verdiğiniz bilgilerin doğruluğundan emin olunuz.
            Kendi hesabınız dışında başka bir kişinin hesabına çekim
            yapamazsınız!
          </label>
        </div>
        <div className="withdraw-money-select-bank">
          <select
            value={bank}
            onChange={(e) => {
              setBank(e.target.value);
            }}
            className="form-select form-select"
            aria-label=".form-select-sm example"
          >
            <option value={"Türkiye Cumhuriyeti Ziraat Bankası"}>
              Türkiye Cumhuriyeti Ziraat Bankası
            </option>
            <option value={"Denizbank"}>Denizbank</option>
            <option value={"Türkiye Vakıflar Bankası"}>
              Türkiye Vakıflar Bankası
            </option>
            <option value={"Garanti Bankası"}>Garanti Bankası</option>
            <option value={"Yapı Kredi Bankası"}>Yapı Kredi Bankası</option>
            <option value={"TEB (Türk Ekonomi Bankası)"}>
              TEB (Türk Ekonomi Bankası)
            </option>
            <option value={"Türkiye İş Bankası"}>Türkiye İş Bankası</option>
            <option value={"QNB Finansbank"}>QNB Finansbank</option>
            <option value={"Şekerbank"}>Şekerbank</option>
            <option value={"ING Bank"}>ING Bank</option>
            <option value={"Fiba Bank"}>Fiba Bank</option>
            <option value={"Akbank"}>Akbank</option>
          </select>
          <div className="user-info">
            <span>
              {user?.name} {user?.surname}
            </span>
          </div>
          <div className="user-info">
            <input
              value={iban}
              onChange={(e) => {
                setIban(e.target.value);
              }}
              placeholder="IBAN"
              type="text"
            />
          </div>
          <div className="user-info">
            <input
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              placeholder="Miktar"
              type="text"
            />
          </div>
          <div className="user-info">
            <textarea
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
              type="text"
              placeholder="Açıklama"
              className="form-control"
              rows={5}
              maxLength={4000}
            />
          </div>

          <button onClick={handleClick}>Çekim Talebi Ver</button>
        </div>
      </div>
    </div>
  );
}
