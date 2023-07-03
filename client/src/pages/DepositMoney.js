import React, { useState, useEffect, useContext } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Context from "../context/ContextApi";
import { useIsAuthenticated } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export default function DepositMoney() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    try {
      if (isAuthenticated()) {
        setOpen(true);
        getBanks(setReceivingBank);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = () => setOpen(false);

  const isAuthenticated = useIsAuthenticated();
  const { getUserInfo, depositReq, getBanks } = useContext(Context);
  const [avatar, setAvatar] = useState("");
  const [balance, setBalance] = useState(0);
  const [user, setUser] = useState([]);
  const [bank, setBank] = useState("Türkiye Cumhuriyeti Ziraat Bankası");
  const [amount, setAmount] = useState("");
  const [iban, setIban] = useState("");
  const [receivingBank, setReceivingBank] = useState([]);

  useEffect(() => {
    try {
      if (isAuthenticated()) {
        getUserInfo(setUser, setAvatar, setBalance);
      }
    } catch (error) {
      console.log(error);
    }
  }, [user?.length]);

  const handleClick = () => {
    try {
      depositReq(user._id, bank, amount, iban);
    setBank("Türkiye Cumhuriyeti Ziraat Bankası");
    setAmount("");
    handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col-md-12 col-lg-9">
      <div className="balances-container">
        <div>
          <Button id="deposit-btn" onClick={handleOpen}>
            Para Yatırma İşlemi
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <h5>Para Yatırma</h5>
              <div className="withdraw-money-select-bank">
                <div className="user-info">
                  <input
                    type="text"
                    value={user?.name + " " + user?.surname}
                    readOnly
                  />
                </div>
                <div className="user-info">
                  <input
                    type="text"
                    placeholder="Miktar"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                  />
                </div>
                <div className="user-info">
                  <input
                    type="text"
                    placeholder="IBAN"
                    value={iban}
                    onChange={(e) => {
                      setIban(e.target.value);
                    }}
                  />
                </div>

                <div className="user-info">
                  <select
                    value={bank}
                    onChange={(e) => {
                      setBank(e.target.value);
                    }}
                    id="deposit-money-select"
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
                    <option value={"Yapı Kredi Bankası"}>
                      Yapı Kredi Bankası
                    </option>
                    <option value={"TEB (Türk Ekonomi Bankası)"}>
                      TEB (Türk Ekonomi Bankası)
                    </option>
                    <option value={"Türkiye İş Bankası"}>
                      Türkiye İş Bankası
                    </option>
                    <option value={"QNB Finansbank"}>QNB Finansbank</option>
                    <option value={"Şekerbank"}>Şekerbank</option>
                    <option value={"ING Bank"}>ING Bank</option>
                    <option value={"Fiba Bank"}>Fiba Bank</option>
                    <option value={"Akbank"}>Akbank</option>
                  </select>
                </div>
                <div className="user-info">
                  <span>
                    {" "}
                    ALICI IBAN:{" "}
                    {receivingBank?.length > 0 ? receivingBank[0]?.iban : null}
                  </span>
                </div>
                <div className="user-info">
                  <span>
                    ALICI BANKA:{" "}
                    {receivingBank?.length > 0
                      ? receivingBank[0]?.receivingBank
                      : null}
                  </span>
                </div>
                <div className="user-info">
                  <span>
                    {receivingBank?.length > 0 ? receivingBank[0]?.desc : null}
                  </span>
                </div>

                <button onClick={handleClick}>Yatırım Talebi Ver</button>
              </div>
            </Box>
          </Modal>
          <div className="deposit-money-explain">
            <h1>
              Minimum Yatırma İşlemi <span>500TL</span>
            </h1>
            <p>
              Firmamız Türkiye Üzeri Yatırım İşlemleri için ''PAPARA'' Yatırım
              Firmasını Kullanmaktadır !
            </p>
            <p>
              Lütfen Para Yatırma İşlemi İçin PROFİL Kısmından Para Yatır
              Bölümünden ''PARA YATIRMA İŞLEMLERİNİ'' Seçerek Banka Seçimi
              Yapabilir. NOT: AÇıklama Kısmına Belirtilen Numarayı ve Kullanıcı
              Adınızı Yazmanız Gerekmektedir! Aksi Takdirde Yatırım
              Alınmamaktadır Ve Sitemiz Herhangi Bir Mağduriyet Kabul
              Etmemektedir.
            </p>
            <p>
              Lütfen Yatırım Dekontunu Sağ Alt Köşede Bulunan ''CANLI DESTEK''
              Birimine İletiniz...
            </p>

            <h5>HAZİRAN AYI KAMPANYAMIZ</h5>
            <p>750 TRY ve üzeri Yatırımda + 100 TRY Bonus</p>
            <p>1000 TRY ve üzeri Yatırımda + 200 TRY Bonus</p>
            <p>10.000 TRY ve üzeri Yatırımda + 2.000 TRY Bonus</p>
            <h4>Yatırmadan önce lütfen okuyunuz!</h4>
            <p>
              {" "}
              1- Havale/EFT veya FAST işlemi yaparak yatırım sağlayabilirsiniz.
            </p>
            <p>
              {" "}
              2- TRY yatırımlarında 500 TL ve üzeri TRY yatırma işlemlerinizi
              gerçekleştirebilirsiniz.
            </p>

            <p>
              3- Kendi adınıza açılmış bireysel hesaplarınızdan veya farklı isim
              bireysel banka hesaplarınızdan yatırım gerçekleştirebilirsiniz.
            </p>
            <p>
              {" "}
              4- Yatırım sonrası mutlaka dekontu canlı destek birimimize
              iletiniz.
            </p>
            <p>5- Günlük Maximum Çekim Limiti 500.000,00 TRY</p>
          </div>
        </div>
      </div>
    </div>
  );
}
