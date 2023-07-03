import React, { useState, useEffect, useContext } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TuneIcon from "@mui/icons-material/Tune";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
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
export default function Users() {
  const { getUsers, getUser, updateUser, deleteUser, getUserWithId } =
    useContext(Context);

  // <getusers>
  const [users, setUsers] = useState([]);
  const [coins, setCoins] = useState([]);
  const [coinsProcess, setCoinsProcess] = useState([]);
  useEffect(() => {
    getUsers(setUsers);
  }, [users?.length]);

  // </getusers>
  // <modals>
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [balance, setBalance] = useState("");
  const [userId, setUserId] = useState("");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleOpen = (id) => {
    getUser(
      id,
      setName,
      setSurname,
      setUsername,
      setPassword,
      setEmail,
      setPhone,
      setBalance,
      setUserId
    );
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen2 = (id) => {
    getUserWithId(id, setCoins, setCoinsProcess);
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  // </modals>

  // <update>
  const handleUpdateBtn = () => {
    updateUser(userId, balance, setUsers);
    handleClose();
  };
  // </update>

  // <delete>

  const handleDeleteBtn = (id) => {
    deleteUser(id, setUsers);
  };

  // </delete>
  return (
    <div className="banks-container">
      <div className="card-body">
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Adı Soyadı</th>
              <th scope="col">Kullanıcı Adı</th>
              <th scope="col">Email</th>
              <th scope="col">Tarihi</th>
              <th scope="col">Bakiye</th>
              <th>
                <TuneIcon />
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={index}>
                <td> {index + 1} </td>
                <td>
                  {user?.name} {user?.surname}
                </td>
                <td>{user?.username}</td>
                <td>{user?.email}</td>
                <td>{user?.createdAt}</td>
                <td>{user?.balance.toFixed(2)}TL</td>
                <td>
                  <FormatListNumberedIcon
                    id="list"
                    onClick={() => {
                      handleOpen2(user?._id);
                    }}
                  />
                  <EditIcon
                    onClick={() => {
                      handleOpen(user?._id);
                    }}
                    id="edit"
                  />{" "}
                  
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
          <button onClick={handleUpdateBtn} id="update-btn">
            Güncelle
          </button>
          <div>
            Bakiye Güncelle
            <input
              type="number"
              value={Number(balance)}
              onChange={(e) => {
                setBalance(e.target.value);
              }}
            />
          </div>
          <div>
            Ad
            <input value={name} readOnly type="text" />
          </div>
          <div>
            Soyad
            <input readOnly value={surname} type="text" />
          </div>
          <div>
            Mail
            <input readOnly value={email} type="text" />
          </div>
          <div>
            Kullanıcı Adı
            <input readOnly value={username} type="text" />
          </div>
          <div>
            Şifre
            <input readOnly value={password} type="text" />
          </div>
          <div>
            Telefon
            <input readOnly value={phone} type="text" />
          </div>
        </Box>
      </Modal>
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box id="banks-modal" sx={style} style={{ height: "100%" }}>
          <div className="card-body user-table-info">
            ALIM SATIM GEÇMİŞİ
            <table className="table table-hover table-striped">
              <thead>
                <tr>
                  <th scope="col">Alım Satım Tarihi</th>
                  <th scope="col">Coin</th>
                  <th scope="col">Al/Sat</th>
                  <th scope="col">Fiyat</th>
                  <th scope="col">Miktar</th>
                </tr>
              </thead>
              <tbody>
                {coinsProcess.map((coin) => (
                  <tr key={coin?._id}>
                    <td>{coin?.time}</td>
                    <td>{coin?.shortName}</td>
                    <td>{coin?.purchaseOrSale === "buy" ? "Al" : "Sat"}</td>
                    <td>{coin?.price}</td>
                    <td>{coin?.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card-body user-table-info">
            COİN LİSTESİ
            <table className="table table-hover table-striped">
              <thead>
                <tr>
                  <th scope="col">Coin</th>
                  <th scope="col">Miktarı</th>
                </tr>
              </thead>
              <tbody>
                {coins.map((item) => (
                  <tr key={item?._id}>
                    <td>{item?.shortName}</td>
                    <td>{item?.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
