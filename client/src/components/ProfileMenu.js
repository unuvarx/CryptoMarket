import React from "react";
import Person2Icon from "@mui/icons-material/Person2";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import FiveKPlusIcon from "@mui/icons-material/FiveKPlus";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, NavLink } from "react-router-dom";

export default function ProfileMenu() {
  return (
    <>
      <Navbar />
      <div className="row profile-screen">
        <div className="col-md-12 col-lg-3">
          <div>
            <Person2Icon />
            <NavLink to="info"> Profil </NavLink>
          </div>
          <div>
            <AccountBalanceWalletIcon />
            <NavLink to="balances">Portföy</NavLink>
          </div>
          <div>
            <ContentPasteIcon />
            <NavLink to="past-process">Geçmiş İşlemler</NavLink>
          </div>
          <div>
            <PointOfSaleIcon />
            <NavLink to="withdraw-money">Para Çek</NavLink>
          </div>
          <div>
            <FiveKPlusIcon />
            <NavLink to="deposit-money">Para Yatır</NavLink>
          </div>
          <div>
            <RequestPageIcon />
            <NavLink to="request-withdraw">Çekim Taleplerim</NavLink>
          </div>
          <div>
            <LocalAtmIcon />
            <NavLink to="request-deposit">Yatırım Taleplerim</NavLink>
          </div>
        </div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
