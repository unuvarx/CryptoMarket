import React, { useEffect, useState, useContext } from "react";
import { useAuthUser } from "react-auth-kit";
import axios from "axios";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";
import Tooltip from "@mui/material/Tooltip";
import Context from "../context/ContextApi";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

import EastIcon from "@mui/icons-material/East";

export default function Profile() {
  const auth = useAuthUser();
  const [user, setUser] = useState({});
  const [balance, setBalance] = useState();
  const [avatar, setAvatar] = useState("");
  const signOut = useSignOut();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  const { getUserInfo, logOut } = useContext(Context);

  useEffect(() => {
    try {
      if (isAuthenticated()) {
        getUserInfo(setUser, setAvatar, setBalance);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  let ProfileScreen;
  if (isAuthenticated()) {
    ProfileScreen = () => {
      return (
        <div className="profile-container">
          <div className="profile-frame">
            <div id="info">
              <span id="title">Kullanıcı Adı </span>
              <span> {user?.username} </span>
            </div>
            <div id="info">
              <span id="title">Ad Soyad </span>
              <span> {user?.name + " " + user?.surname} </span>
            </div>
            <div id="info">
              <span id="title"> Mail </span>
              <span> {user?.email} </span>
            </div>
            <div id="info">
              <span id="title"> Telefon </span>
              <span> {user?.phone} </span>
            </div>
            <div className="profile-logout-btn">
              <button
                onClick={() => {
                  logOut(signOut, setUser, setAvatar, navigate);
                }}
              >
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      );
    };
  } else {
    ProfileScreen = () => {
      return (
        <div className="profile-container">
          <div className="profile-frame">
            <div className="profile-avatar empty">
              <img id="empty-profile" src="/images/emptyprofil.png" alt="" />
            </div>
            <div className="user-does-not-exist">
              <span> KULLANICI BULUNAMADI </span>
            </div>
            <div className="profile-logout-btn">
              <button onClick={() => navigate("/login")}>
                Giriş Ekranına Git
              </button>
            </div>
          </div>
        </div>
      );
    };
  }

  return (
    <div className="col-md-12 col-lg-9">
      <ProfileScreen />
    </div>
  );
}
