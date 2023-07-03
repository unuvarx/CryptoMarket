import React, { useState, useEffect, useContext } from "react";
import Context from "../../context/ContextApi";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TuneIcon from "@mui/icons-material/Tune";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

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

export default function ReqDeposit() {
  // <middleware>

  const { getUsers, updateDeposit, getDeposit, updateUser } =
    useContext(Context);
  const [users, setUsers] = useState([]);
  const [nameSurname, setNameSurname] = useState("");
  const [bank, setBank] = useState("");
  const [amount, setAmount] = useState("");
  const [iban, setIban] = useState("");
  const [state, setState] = useState("Bekliyor");
  const [userId, setUserId] = useState("");
  const [depositId, setDepositId] = useState("");
  const [reason, setReason] = useState("");
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    try {
      getUsers(setUsers);
      if (users?.length > 0) {
      }
    } catch (error) {
      console.log(error);
    }
  }, [users?.length]);

  const [open, setOpen] = useState(false);

  const handleOpen = (userId, depositId) => {
    try {
      setBalance(users?.find((user) => user._id === userId).balance);
      getDeposit(
        userId,
        depositId,
        users,
        setNameSurname,
        setBank,
        setAmount,
        setIban,
        setState,
        setReason,
        setUserId,
        setDepositId
      );
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  // </middleware>

  // <update>
  const handleUpdateBtn = () => {
    try {
      updateDeposit(userId, depositId, state, reason);
    updateUser(userId, balance, setUsers);
    getUsers(setUsers);
    handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  // </update>

  return (
    <div className="banks-container">
      <h2>Yatırım Talepleri</h2>
      <div className="card-body">
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">Ad Soyad</th>
              <th scope="col">Banka</th>

              <th scope="col">IBAN</th>
              <th scope="col">Miktar</th>
              
              <th scope="col">Durum</th>
              <th scope="col">Red Nedeni</th>
              <th scope="col">Tarih</th>

              <th>
                <TuneIcon />
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) =>
              user.depositMoney.map((item) => (
                <tr key={item?._id}>
                  <td>
                    {user?.name} {user?.surname}
                  </td>
                  <td>{item?.bank}</td>

                  <td>{item?.iban}</td>
                  <td id="sale-price">{item?.amount}</td>
                  
                  <td id="purchase-price">{item?.state}</td>
                  <td>{item?.reason}</td>
                  <td>{item?.time}</td>
                  <td>
                    <EditIcon
                      onClick={() => {
                        handleOpen(user._id, item._id);
                      }}
                      id="edit"
                    />{" "}
                  </td>
                </tr>
              ))
            )}
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
            Bakiye Güncelle
            <input
              value={Number(balance)}
              onChange={(e) => {
                setBalance(e.target.value);
              }}
              type="number"
            />
          </div>
          <div>
            Durumu
            <select
              value={state}
              onChange={(e) => {
                setState(e.target.value);
              }}
              id="deposit-money-select"
              className="form-select form-select"
              aria-label=".form-select-sm example"
            >
              <option value="Bekliyor">Bekliyor</option>
              <option value="Reddedildi">Reddedildi</option>
              <option value="Onaylandı">Onaylandı</option>
            </select>
          </div>
          <div>
            Red Nedeni (Durumu Reddedildi İse)
            <input
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
              }}
              type="text"
            />
          </div>
          <div>
            Ad Soyad
            <input
              style={{ color: "red" }}
              value={nameSurname}
              readOnly
              type="text"
            />
          </div>
          <div>
            Banka
            <input style={{ color: "red" }} value={bank} readOnly type="text" />
          </div>
          <div>
            Miktar
            <input
              style={{ color: "red" }}
              value={amount + "TL"}
              readOnly
              type="text"
            />
          </div>
          <div>
            İban
            <input style={{ color: "red" }} value={iban} readOnly type="text" />
          </div>
          <button onClick={handleUpdateBtn} id="update-btn">
            Güncelle
          </button>
        </Box>
      </Modal>
    </div>
  );
}
