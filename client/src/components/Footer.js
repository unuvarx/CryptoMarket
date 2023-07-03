import React from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-website-title">
        <h2> crypto.com </h2>
      </div>
      <div className="footer-pages">
        <div>
          <Link to="/about">Hakkımızda</Link>
          <Link to="personal-data">Kişisel Verilerin Korunması</Link>
        </div>
        <div>
          <Link to="/privacy">Gizlilik Politikası</Link>
          <Link to="/questions" >Sık Sorulan Sorular</Link>
        </div>
        <div>
          <Link to="/text">Aydınlatma Metni</Link>
          <Link  to="/agreement" >Kullanıcı Sözleşmesi</Link>
        </div>
      </div>
      <div className="footer-icons">
        <span>
          <FacebookIcon />
        </span>
        <span>
          <TwitterIcon />
        </span>
        <span>
          <InstagramIcon />
        </span>
        <span>
          <LinkedInIcon />
        </span>
      </div>
      <div className="footer-copyright">
        <p>
          {" "}
          Copyright @2023 All rights reserved | This template is made with by{" "}
          <label> crypto.com </label>{" "}
        </p>
      </div>
      <div className="banks">
        <img src="/images/bank.png" alt="" />
      </div>
    </footer>
  );
}
