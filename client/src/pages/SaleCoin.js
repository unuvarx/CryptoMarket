import React, { useEffect, useState, useRef, useContext } from "react";
import TickerTapeWidget from "../widgets/TickerTapeWidget";
import RequestWidget from "../widgets/RequestWidget";
import Context from "../context/ContextApi";
import { useIsAuthenticated } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

export default function SaleCoin() {
  // <middlewares>
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const purchase = useRef(0);
  const sale = useRef(0);

  const [userCoins, setUserCoins] = useState([]);
  const [balance, setBalance] = useState("");
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [coins, setCoins] = useState([]);
  const {
    getCoins,
    getUserWithUseAuth,
    updateUser,
    buyOrSellOrder,
    buyCoin,
    sellCoin,
  } = useContext(Context);
  useEffect(() => {
    try {
      getUserWithUseAuth(setUser);
      getCoins(setCoins);
      purchase.total = 0;

      if (coins.length > 0) {
        setBuyingShortName(coins[0].shortName);
        purchase.current = Number(coins[0].purchasePrice);
      }
    } catch (error) {
      console.log(error);
    }
  }, [coins?.length]);
  useEffect(() => {
    try {
      sale.total = 0;
      if (coins.length > 0) {
        if (user.coins) {
          if (user.coins.length > 0) {
            setUserCoins(user.coins);
            setSellingShortName(user.coins[0].shortName);
            sale.amount = user.coins[0].amount;
            sale.coin = user.coins[0].shortName;
            sale.current = Number(
              coins.find((item) => item.shortName === user.coins[0].shortName)
                .salePrice
            );
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [user?.coins]);
  // </middlewares>

  // <random request table>
  const arr = useRef([]);
  const [currentValue, setCurrentValue] = useState(0);
  const [boxColors, setBoxColors] = useState([]);

  useEffect(() => {
    try {
      const intervalId = setInterval(() => {
        const randomNumber = Math.random().toFixed(7);
        arr.current.push(randomNumber);
        setCurrentValue(randomNumber);
        setBoxColors(generateBoxColors(arr.current.length));
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    } catch (error) {
      console.log(error);
    }
  }, []);

  const generateBoxColors = (count) => {
    try {
      const colors = ["#ff231f", "#26de81"];
      const randomColors = [];
      const fixedIndex = Math.floor(Math.random() * count); // Sabit renk için bir indeks belirle
      for (let i = 0; i < count; i++) {
        const color = i === fixedIndex ? "#26de81" : getRandomColor(colors);
        randomColors.push(color);
      }
      return randomColors;
    } catch (error) {
      console.log(error);
    }
  };

  const getRandomColor = (colors) => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };
  // </random request table>

  // <changes>
  const changeBuySelect = (e) => {
    try {
      setBuyingShortName(e.target.value);
      purchase.current = Number(
        coins.find((item) => item.shortName === e.target.value).purchasePrice
      );
    } catch (error) {
      console.log(error);
    }
  };
  const changeBuyAmount = (e) => {
    try {
      setBuyingAmount(e.target.value);
      purchase.total =
        Number(
          coins.find((item) => item.shortName === buyingShortName).purchasePrice
        ) * e.target.value;
    } catch (error) {
      console.log(error);
    }
  };
  const changeSellSelect = (e) => {
    try {
      setSellingShortName(e.target.value);
      sale.current = Number(
        coins.find((item) => item.shortName === e.target.value).salePrice
      );
      sale.coin = e.target.value;
      sale.amount = Number(
        userCoins.find((item) => item.shortName === e.target.value).amount
      );
    } catch (error) {
      console.log(error);
    }
  };
  const changeSellAmount = (e) => {
    try {
      setSellingAmount(e.target.value);
      let template = coins.find((item) => item.shortName === sellingShortName);
      if (template) {
        sale.total =
          Number(
            coins.find((item) => item.shortName === sellingShortName).salePrice
          ) * e.target.value;
      }
    } catch (error) {
      console.log(error);
    }
  };
  // </changes>

  // <request buying>
  const [buyingShortName, setBuyingShortName] = useState("");
  const [buyingAmount, setBuyingAmount] = useState(0);
  const [isBalance, setIsBalance] = useState(null);

  const handlePlaceByOrder = () => {
    try {
      if (isAuthenticated()) {
        if (buyingAmount > 0) {
          if (user.balance >= purchase.total) {
            let newBalance =
              user.balance -
              coins.find((item) => item.shortName === buyingShortName)
                .purchasePrice *
                buyingAmount;

            if (newBalance >= 0) {
              buyOrSellOrder(
                user._id,
                buyingShortName,
                "buy",
                coins.find((coin) => coin.shortName === buyingShortName)
                  .purchasePrice,
                buyingAmount
              );
              updateUser(user._id, newBalance, setUsers);
              setIsBalance(true);
              buyCoin(
                user._id,
                buyingShortName,
                Number(
                  coins.find((coin) => coin.shortName === buyingShortName)
                    .purchasePrice
                ),
                Number(buyingAmount)
              );
              window.location.reload();
            } else {
              setIsBalance(false);
            }
          } else {
            setIsBalance(false);
          }
        } else {
          setIsBalance(false);
        }
        setBuyingAmount(0);
        purchase.total = 0;
      } else {
        navigate("/login");
      }
    } catch (error) {
      setIsBalance(false);
    }
  };

  // </request buying>

  // <reques sell>
  const [sellingShortName, setSellingShortName] = useState("");
  const [sellingAmount, setSellingAmount] = useState(0);
  const [isSelling, setIsSelling] = useState(null);

  const handleSellOrder = () => {
    try {
      if (isAuthenticated()) {
        if (sellingAmount > 0) {
          if (
            sellingAmount <=
            userCoins.find((coin) => coin.shortName === sellingShortName).amount
          ) {
            buyOrSellOrder(
              user._id,
              sellingShortName,
              "sell",
              coins.find((coin) => coin.shortName === buyingShortName)
                .salePrice,
              sellingAmount
            );
            let newBalance =
              coins.find((item) => item.shortName === sellingShortName)
                .salePrice *
                sellingAmount +
              user.balance;
            updateUser(user._id, newBalance, setUsers);
            setIsSelling(true);
            sellCoin(
              user._id,
              sellingShortName,
              coins.find((item) => item.shortName === sellingShortName)
                .salePrice,
              sellingAmount
            );
            window.location.reload();
          } else {
            setIsSelling(false);
          }
        } else {
          setIsSelling(false);
        }
        sale.total = 0;
        setSellingAmount(0);
      } else {
        navigate("/login");
      }
    } catch (error) {
      setIsSelling(false);
    }
  };
  // </reques sell>

  // <inputs>

  // </inputs>

  return (
    <div className="sale-coin-container">
      <div className="slider">
        <TickerTapeWidget />
      </div>
      <h2> Piyasadaki Kripto Paralar </h2>
      <br />
      <div className="coin-table">
        <table className="table table-hover table-dark">
          <thead>
            <tr>
              <th>#</th>
              <th scope="col">Coin</th>
              <th scope="col">Sembol</th>
              <th scope="col">Fiyatı</th>
              <th scope="col">Değişim</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((item) => (
              <tr key={item?._id} id="coin-logo">
                <td>
                  <img src={`/images/${item?.img}`} alt="" />
                </td>
                <td> {item?.coinName} </td>
                <td> {item?.shortName} </td>
                <td>{item?.purchasePrice}TL</td>
                <td
                  style={
                    item?.change > 0
                      ? { color: "#26de81" }
                      : { color: "#ff231f" }
                  }
                >
                  {item?.change}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 id="process-title">Alış Satış İşlemleri</h2>
      <div className="request-container">
        <div className="requests">
          <div className="request">
            {isBalance === false ? (
              <span
                style={{
                  fontSize: "13px",
                  color: "red",
                  transitionDuration: "1s",
                }}
              >
                {" "}
                Lütfen adet kısmını doğru girin!{" "}
              </span>
            ) : (
              <></>
            )}
            <div className="title">
              <span id="amount-price">
                Alış~{purchase.current.toFixed(2)}TL
              </span>
            </div>
            <select
              value={buyingShortName}
              onChange={(e) => {
                changeBuySelect(e);
              }}
              id="deposit-money-select"
              className="form-select form-select"
              aria-label=".form-select-sm example"
            >
              {coins.map((coin) => (
                <option key={coin?._id} value={`${coin?.shortName}`}>
                  {coin?.shortName}
                </option>
              ))}
            </select>
            <input
              value={buyingAmount}
              onChange={(e) => {
                changeBuyAmount(e);
              }}
              type="number"
              placeholder="Adet giriniz"
            />
            <input
              id="total"
              readOnly
              value={"Toplam: " + purchase?.total}
              type="text"
            />
            <button onClick={handlePlaceByOrder} id="deposit">
              Alış Emri Ver
            </button>
          </div>

          <div className="request">
            {isSelling === false ? (
              <span
                style={{
                  fontSize: "13px",
                  color: "red",
                  transitionDuration: "1s",
                }}
              >
                {" "}
                Lütfen adet kısmını doğru girin!{" "}
              </span>
            ) : (
              <></>
            )}
            <div className="title">
              <span id="sell-price">Satış~{sale?.current}TL</span>
              <span id="sell-amount">
                {sale?.amount}
                {sale?.coin}
              </span>
            </div>
            <select
              value={sellingShortName}
              onChange={(e) => {
                changeSellSelect(e);
              }}
              id="deposit-money-select"
              className="form-select form-select"
              aria-label=".form-select-sm example"
            >
              {userCoins?.length !== 0 ? (
                userCoins?.map((coin) => (
                  <option key={coin._id} value={`${coin?.shortName}`}>
                    {coin?.shortName}
                  </option>
                ))
              ) : (
                <option value="">Coin bulunamadı</option>
              )}
            </select>
            <input
              value={sellingAmount}
              onChange={(e) => {
                changeSellAmount(e);
              }}
              type="number"
              placeholder="Adet giriniz"
            />
            <input
              id="sell-total"
              readOnly
              value={"Toplam: " + sale.total}
              type="text"
            />
            <button onClick={handleSellOrder} id="withdraw">
              Satış Emri Ver
            </button>
          </div>
        </div>

        <div className="rnd-withdraw-deposit">
          <p>Bekleyen Alış/Satış Emri</p>
          <div className="boxes-container">
            <div className="box">
              {arr.current.map((value, index) => (
                <div key={index} style={{ color: boxColors[index] }}>
                  {value}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="request-widget-container">
        <RequestWidget />
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
