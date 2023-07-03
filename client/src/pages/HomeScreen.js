import React, { useRef, useEffect } from "react";
import TickerWidget from "../widgets/TickerWidget";
import MarketOverviewWidget from "../widgets/MarketOverviewWidget";
import AdvancedChartWidget from "../widgets/AdvancedChartWidget";
import TickerTapeWidget from "../widgets/TickerTapeWidget";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import SecurityIcon from "@mui/icons-material/Security";
import SmartScreenIcon from "@mui/icons-material/SmartScreen";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import InventoryIcon from "@mui/icons-material/Inventory";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { useNavigate } from "react-router-dom";
import { gsap, Power3 } from "gsap";
export default function HomeScreen() {
  let items = useRef(null);
  const summaryRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    gsap.from(items, {
      opacity: 1,
      y: 0, // Adjust the y value as needed
      ease: Power3.easeOut,
      delay: 0.5,
    });
  

    const summaryElement = summaryRef.current;
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const summaryPosition = summaryElement.offsetTop;

      if (scrollPosition > summaryPosition - window.innerHeight / 2) {
        gsap.from(summaryElement, {
          opacity: 0,
          x: -100,
          duration: 2,
          ease: Power3.easeOut,
        });
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={(el) => {
        items = el;
      }}
      className="home-page-container no-transform"
    >
      <div ref={summaryRef} className="home-page-title">
        <h1>Bitcoin ve Kripto Pazarı</h1>
        <span>
          Hemen Kayıt Olun Ve Dakikalar İçerisinde Borsa Firması Bitco 50+
          Kripto Para Biriminden Dilediğinizi Satın Alın.
        </span>
        <span>10$ Gibi Küçük Bir Tutarla Bile Başlayabilirsiniz.</span>
        <button
          onClick={() => {
            navigate("/coins");
          }}
        >
          Hemen Başla
        </button>
      </div>
      <div className="home-page-coins-title-cards">
        <TickerWidget />
      </div>
      <div className="live-market-container">
        <div id="market-title">
          <h3>Detaylı İnceleme İle Piyasa Takibi</h3>
        </div>
        <div className="market">
          <AdvancedChartWidget />
        </div>
      </div>
      <div className="icons-container">
        <div>
          <h2>Dakikalar içinde Bitcoin al</h2>
        </div>
        <div className="icons">
          <div>
            <HowToRegIcon />
            <span>Üye Ol</span>
          </div>
          <div>
            <ArrowRightAltIcon id="arrow" />
          </div>
          <div>
            <CurrencyExchangeIcon />
            <span>Para Yatır</span>
          </div>
          <div>
            <ArrowRightAltIcon id="arrow" />
          </div>
          <div>
            <CurrencyBitcoinIcon />
            <span>Bitcoin Al</span>
          </div>
        </div>
      </div>
      <div className="summary-container" ref={summaryRef}>
        <div id="summary" className="sum-info">
          <h3>Canlı Piyasa Takibi</h3>
          <p>
            Başlangıçtan itibaren kullanımı kolay bir deneyim. İlk günden
            itibaren hem yeni başlayanlar hem de uzmanlar için modern bir
            bitcoin borsası tasarladık ve oluşturduk. Kolay para yatırma ve
            çekme işlemleri yapın, portföyünüzün performansını ölçün ve tüm
            kripto paralarınızı tek bir yerden takip edin.
          </p>
          <ul>
            <li>
              <CheckCircleIcon />
              Canlı Kazanç Takibi
            </li>
            <li>
              <CheckCircleIcon />
              Canlı Kaybedenler Takibi
            </li>
            <li>
              <CheckCircleIcon />
              Canlı Piyasa Verileri
            </li>
            <li>
              <CheckCircleIcon />
              Canlı Kripto Para Birimi Fiyatı
            </li>
            <li>
              <CheckCircleIcon />
              Canlı Kripto Para Birimi Fiyatı
            </li>
          </ul>
        </div>
        <div id="summary">
          <MarketOverviewWidget />
        </div>
      </div>
      <div className="home-slider">
        <TickerTapeWidget />
      </div>
      <div className="processes">
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
      <div className="information-cards-container">
        <div>
          <SettingsIcon />
          <span> Güvenli Depo </span>
          <p>
            Dijital paralarınız offline cüzdanlarda muhafaza edilmektedir.
            Yüksek güvenlikli sistemimizde, yatırımlarınız her zaman güvendedir.
          </p>
        </div>
        <div>
          <SecurityIcon />
          <span>Gizlilik</span>
          <p>
            Kimlik doğrulama işlemi, sunduğumuz hizmetlere bağlı olarak
            belirlenen politikalar doğrultusunda yapılmaktadır. Hesap onayı
            belgeleriniz şifrelenmiş olarak saklanır ve asla üçüncü şahıslarla
            paylaşılmaz, hesabınızın onaylanmasından başka bir amaç için
            kullanılmaz.
          </p>
        </div>
        <div>
          <SmartScreenIcon />
          <span>Akıllı Arayüz</span>
          <p>
            Kullanıcı dostu arayüzümüz, her seviyedeki üyemizin alım, satım ve
            diğer tüm işlemlerini en hızlı ve en kolay şekilde yapabilmesi için
            tasarlanmıştır.
          </p>
        </div>
        <div>
          <SupportAgentIcon />
          <span>Destek Hattı</span>
          <p>
            {" "}
            Purinabet, kullanıcılarına mükemmel deneyimi yaşatmak için 7/24
            telefon ve site üzerinde canlı destek sunmaktadır. Deneyimli
            ekibimizle hemen iletişim kurabilir, görüş ve önerilerinizi
            paylaşabilirsiniz.{" "}
          </p>
        </div>
        <div>
          <InventoryIcon />
          <span>7/24 Yatırım İşlemleri</span>
          <p>
            Anlaşmalı olduğumuz bankalar üzerinden para gönderme işlemlerinizi
            7/24 gerçekleştirebilir, haftanın her günü her saat alım satım
            işlemlerini kesintisiz ve hızlı bir şekilde yapabilirsiniz.
          </p>
        </div>
        
      </div>
    </div>
  );
}
