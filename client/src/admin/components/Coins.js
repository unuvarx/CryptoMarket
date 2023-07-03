import React, { useState, useContext, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TuneIcon from "@mui/icons-material/Tune";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Context from "../../context/ContextApi";

const style = {

  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Coins() {
  const { createCoin, getCoins, getCoin, updateCoin, deleteCoin } =
    useContext(Context);

  // <addCoin>
  const [coinName, setCoinName] = useState("");
  const [shortName, setShortName] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [change, setChange] = useState("");
  const [img, setImg] = useState({
    file: [],
  });

  const addCoin = () => {
    try {
      createCoin(
        coinName,
        shortName,
        purchasePrice,
        salePrice,
        change,
        setCoins,
        img
      );
      handleClose2();
    } catch (error) {
      console.log(error);
    }
  };
  // </addCoin>

  // <getCoins>
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    getCoins(setCoins);
  }, []);

  // </getCoins>

  // <modals>
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [coinId, setCoinId] = useState("");
  const handleOpen = (id) => {
    getCoin(
      id,
      setCoinName,
      setShortName,
      setPurchasePrice,
      setSalePrice,
      setChange,
      setCoinId
    );

    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  // </modals>

  // <update>

  const handleUpdateBtn = () => {
    try {
      updateCoin(
        coinId,
        coinName,
        shortName,
        purchasePrice,
        salePrice,
        change,
        setCoins
      );
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  // </update>

  // <delete>

  const handleDeleteBtn = (id) => {
    try {
      deleteCoin(id, setCoins);
    } catch (error) {
      console.log(error);
    }
  };

  // </delete>
  return (
    <div className="banks-container">
      <button onClick={handleOpen2} id="add-coin">
        +COİN EKLE
      </button>
      <div className="card-body">
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">İcon</th>
              <th scope="col">Coin Adı</th>
              <th scope="col">Kısaltması</th>
              <th scope="col">Alış Fiyatı</th>
              <th scope="col">Satış Fiyatı</th>
              <th scope="col">Değişim Oranı</th>
              <th>
                <TuneIcon />
              </th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <tr key={coin?._id}>
                <td id="coin-icon">
                  {" "}
                  <img src={`/images/${coin?.img}`} alt="" />{" "}
                </td>
                <td>{coin?.coinName}</td>
                <td>{coin?.shortName}</td>
                <td id="sale-price">{coin?.purchasePrice}</td>
                <td id="purchase-price">{coin?.salePrice}</td>
                <td id="change-price">{coin?.change}%</td>
                <td>
                  <EditIcon
                    onClick={() => {
                      handleOpen(coin?._id);
                    }}
                    id="edit"
                  />{" "}
                  <DeleteIcon
                    onClick={() => {
                      handleDeleteBtn(coin?._id);
                    }}
                    id="delete"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box id="banks-modal" sx={style}>
          <div>
            Coin Adı
            <input
              onChange={(e) => {
                setCoinName(e.target.value);
              }}
              value={coinName}
              type="text"
            />
          </div>
          <div>
            Kısaltması
            <input
              onChange={(e) => {
                setShortName(e.target.value);
              }}
              value={shortName}
              type="text"
            />
          </div>
          <div>
            Alış Fiyatı
            <input
              onChange={(e) => {
                setPurchasePrice(e.target.value);
              }}
              value={purchasePrice}
              id="purchase"
              type="text"
            />
          </div>
          <div>
            Satış Fiyatı
            <input
              onChange={(e) => {
                setSalePrice(e.target.value);
              }}
              value={salePrice}
              id="sale"
              type="text"
            />
          </div>
          <div>
            Değişim Oranı %
            <input
              onChange={(e) => {
                setChange(e.target.value);
              }}
              value={change}
              id="change"
              type="text"
            />
          </div>
          <button onClick={handleUpdateBtn} id="update-btn">
            Güncelle
          </button>
        </Box>
      </Modal>
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box id="banks-modal" sx={style}>
          <div>
            <div id="file-input-container">
              <input
                id="file-input"
                multiple
                type="file"
                name="img"
                onChange={(e) => {
                  setImg({ ...img, file: e.target.files[0] });
                }}
              />
            </div>
          </div>
          <div>
            Coin Adı
            <input
              onChange={(e) => {
                setCoinName(e.target.value);
              }}
              type="text"
            />
          </div>
          <div>
            Kısaltması
            <input
              onChange={(e) => {
                setShortName(e.target.value);
              }}
              type="text"
            />
          </div>
          <div>
            Alış Fiyatı
            <input
              onChange={(e) => {
                setPurchasePrice(e.target.value);
              }}
              id="purchase"
              type="text"
            />
          </div>
          <div>
            Satış Fiyatı
            <input
              onChange={(e) => {
                setSalePrice(e.target.value);
              }}
              id="sale"
              type="text"
            />
          </div>
          <div>
            Değişim Oranı
            <input
              onChange={(e) => {
                setChange(e.target.value);
              }}
              id="change"
              type="text"
            />
          </div>
          <button onClick={addCoin} id="update-btn">
            Ekle
          </button>
        </Box>
      </Modal>
    </div>
  );
}
