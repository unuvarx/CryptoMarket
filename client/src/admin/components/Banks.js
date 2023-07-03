import React, { useState, useEffect, useContext } from "react";
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

export default function Banks() {
  const { createBank, getBanks, getBank, updateBank, deleteBank } =
    useContext(Context);

  // <addBank>
  const [receivingBank, setReceivingBank] = useState("");
  const [iban, setIban] = useState("");
  const [desc, setDesc] = useState("");

  const addBank = () => {
    try {
      createBank(receivingBank, iban, desc, setBanks);
    handleClose2();
    } catch (error) {
      console.log(error); 
    }
  };
  // </addBank>

  // <getBanks>
  const [banks, setBanks] = useState([]);
  useEffect(() => {
    getBanks(setBanks);
  }, []);

  // </getBanks>

  // <modals>
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [bankId, setBankId] = useState("");
  const handleOpen = (id) => {
    getBank(id, setReceivingBank, setIban, setDesc, setBankId);

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
    
    updateBank(bankId, receivingBank, iban, desc, setBanks);
    handleClose();
  };
  // </update>

  // <delete>

  const handleDeleteBtn = (id) => {
    deleteBank(id, setBanks);
  };

  // </delete>

  return (
    <div className="banks-container">
      <h2>Bankalar</h2>
      <p style={{color: '#ff231f'}}>Not: Listedeki ilk banka alıcı banka olarak kullanıcılara görünür.</p>
      <button onClick={handleOpen2} id="add-coin">
        +BANKA EKLE
      </button>
      <div className="card-body">
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">Banka Alıcı</th>
              <th scope="col">Banka İban</th>
              <th scope="col">Banka Açıklama</th>
              <th>
                <TuneIcon />
              </th>
            </tr>
          </thead>
          <tbody>
            {banks.map((bank) => (
              <tr key={bank._id}>
                <td>{bank?.receivingBank}</td>
                <td>{bank?.iban}</td>
                <td>{bank?.desc}</td>
                <td>
                  <EditIcon
                    onClick={() => {
                      handleOpen(bank?._id);
                    }}
                    id="edit"
                  />
                  <DeleteIcon
                    onClick={() => {
                      handleDeleteBtn(bank?._id);
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
            Alıcı Banka
            <input
              onChange={(e) => {
                setReceivingBank(e.target.value);
              }}
              value={receivingBank}
              type="text"
            />
          </div>
          <div>
            Banka İBAN
            <input
              onChange={(e) => {
                setIban(e.target.value);
              }}
              value={iban}
              type="text"
            />
          </div>

          <div>
            Banka Açıklaması
            <input
              onChange={(e) => {
                setDesc(e.target.value);
              }}
              value={desc}
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
            Alıcı Banka
            <input onChange={(e) => {
                setReceivingBank(e.target.value);
              }} type="text" />
          </div>
          <div>
            Banka İBAN
            <input onChange={(e) => {
                setIban(e.target.value);
              }} type="text" />
          </div>

          <div>
            Banka Açıklaması
            <input onChange={(e) => {
                setDesc(e.target.value);
              }} type="text" />
          </div>
          <button onClick={addBank} id="update-btn">Ekle</button>
        </Box>
      </Modal>
    </div>
  );
}
