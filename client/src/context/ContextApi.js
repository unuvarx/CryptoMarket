import React, { useState, useEffect, useRef, createContext } from "react";
import axios from "axios";
import {
  useSignIn,
  useAuthUser,
  useIsAuthenticated,
  useSignOut,
} from "react-auth-kit";

const Context = createContext();
function Provider({ children }) {
  // !<USER>
  const signIn = useSignIn();
  const auth = useAuthUser();

  const isAuthenticated = useIsAuthenticated();
  const signOut = useSignOut();

  const submitLogin = async (event, navigate, setCheckLogin) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const response = await axios.post(
        "http://localhost:8800/api/auth/login",
        {
          username: data.get("email"),
          password: data.get("password"),
        }
      );
      signIn({
        token: response.data.details.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: {
          username: data.get("email"),
          password: data.get("password"),
        },
      });
      setCheckLogin(true);
      navigate("/");
    } catch (error) {
      setCheckLogin(false);
      console.log(error);
    }
  };

  const submitRegister = async (event, navigate, setIsRegister) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const res = await axios.post("http://localhost:8800/api/auth/register", {
        username: data.get("username"),
        name: data.get("firstName"),
        surname: data.get("lastName"),
        email: data.get("email"),
        password: data.get("password"),
        phone: data.get("phone"),
      });

      signIn({
        token: res.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: {
          username: data.get("username"),
          password: data.get("password"),
        },
      });
      setIsRegister(true)
      navigate("/");
    } catch (error) {
      console.log(error);
      setIsRegister(false);
    }
  };
  const getUserInfo = async (setUser, setAvatar, setBalance) => {
    if (isAuthenticated()) {
      try {
        const res = await axios.get("http://localhost:8800/api/users");
        const findUser = res.data.find(
          (user) => user.username === auth().username
        );
        setUser(findUser);
        setBalance(findUser.balance);
        setAvatar(findUser.name[0] + findUser.surname[0]);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const logOut = (signOut, setUser, setAvatar, navigate) => {
    try {
      signOut();
      setUser({});
      setAvatar("");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async (setUsers) => {
    try {
      const res = await axios.get("http://localhost:8800/api/users");
      setUsers(res.data.filter((user) => user.isAdmin === false));
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async (
    id,
    setName,
    setSurname,
    setUsername,
    setPassword,
    setEmail,
    setPhone,
    setBalance,
    setUserId
  ) => {
    if (isAuthenticated()) {
      try {
        const res = await axios.get(`http://localhost:8800/api/users/${id}`);
        setName(res.data.name);
        setSurname(res.data.surname);
        setUsername(res.data.username);
        setEmail(res.data.email);
        setPassword(res.data.password);
        setPhone(res.data.phone);
        setBalance(res.data.balance);
        setUserId(res.data._id);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateUser = async (id, balance, setUsers) => {
    if (isAuthenticated()) {
      try {
        await axios.put(`http://localhost:8800/api/users/${id}`, {
          balance,
        });
        getUsers(setUsers);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const deleteUser = async (id, setUsers) => {
    if (isAuthenticated()) {
      try {
        const res = await axios.get("http://localhost:8800/api/users");
        const findUser = res.data.find(
          (user) => user.username === auth().username
        );

        try {
          if (findUser.isAdmin) {
            await axios.delete(`http://localhost:8800/api/users/${id}`);
          } else {
            signOut();
            await axios.delete(`http://localhost:8800/api/users/${id}`);
          }
          getUsers(setUsers);
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const getUserWithUseAuth = async (setUser) => {
    if (isAuthenticated()) {
      try {
        const res = await axios.get("http://localhost:8800/api/users");
        const findUser = res.data.find(
          (user) => user.username === auth().username
        );
        setUser(findUser);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const buyOrSellOrder = async (
    id,
    shortName,
    purchaseOrSale,
    price,
    amount
  ) => {
    if (isAuthenticated()) {
      try {
        await axios.put(
          `http://localhost:8800/api/users/add-coinsprocess/${id}`,
          {
            coinsProcess: {
              shortName,
              purchaseOrSale,
              price,
              amount,
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };
  const buyCoin = async (id, shortName, price, amount) => {
    if (isAuthenticated()) {
      try {
        await axios.put(`http://localhost:8800/api/users/add-coin/${id}`, {
          coins: {
            shortName,
            price,
            amount,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const sellCoin = async (id, shortName, price, amount) => {
    if (isAuthenticated()) {
      try {
        await axios.put(`http://localhost:8800/api/users/sell-coin/${id}`, {
          coins: {
            shortName,
            price,
            amount,
          },
        });
      } catch (error) {}
    }
  };
  const getUserWithId = async (id, setCoins, setCoinsProcess) => {
    if (isAuthenticated()) {
      try {
        const res = await axios.get(`http://localhost:8800/api/users/${id}`);
        setCoins(res.data.coins);
        setCoinsProcess(res.data.coinsProcess);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const withdrawReq = async (id, bank, iban, amount, desc) => {
    if (isAuthenticated()) {
      try {
        await axios.put(`http://localhost:8800/api/users/withdraw/${id}`, {
          withdrawMoney: {
            bank,
            iban,
            amount,
            desc,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const depositReq = async (id, bank, amount, iban) => {
    if (isAuthenticated()) {
      try {
        await axios.put(`http://localhost:8800/api/users/deposit/${id}`, {
          depositMoney: {
            bank,
            amount,
            iban,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getWithdraw = async (
    userId,
    withdrawId,
    users,
    setNameSurname,
    setBank,
    setAmount,
    setIban,
    setState,
    setReason,
    setUserId,
    setWithdrawId
  ) => {
    try {
      const resUser = users.find((user) => user._id === userId);
      const resWithdraw = resUser.withdrawMoney.find(
        (item) => item._id === withdrawId
      );
      setNameSurname(resUser.name + " " + resUser.surname);
      setBank(resWithdraw.bank);
      setAmount(resWithdraw.amount);
      setIban(resWithdraw.iban);
      setState(resWithdraw.state);
      setReason(resWithdraw.reason);
      setUserId(resUser._id);
      setWithdrawId(resWithdraw._id);
    } catch (error) {
      console.log(error);
    }
  };
  const getDeposit = async (
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
  ) => {
    try {
      const resUser = users.find((user) => user._id === userId);
      const resDeposit = resUser.depositMoney.find(
        (item) => item._id === depositId
      );
      setNameSurname(resUser.name + " " + resUser.surname);
      setBank(resDeposit.bank);
      setAmount(resDeposit.amount);
      setIban(resDeposit.iban);
      setState(resDeposit.state);
      setReason(resDeposit.reason);
      setUserId(resUser._id);
      setDepositId(resDeposit._id);
    } catch (error) {
      console.log(error);
    }
  };

  const updateWithdraw = async (userId, withdrawId, state, reason) => {
    try {
      const res = await axios.put(
        `http://localhost:8800/api/users/withdraw/${userId}/${withdrawId}`,
        {
          withdrawMoney: {
            state,
            reason,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const updateDeposit = async (userId, depositId, state, reason) => {
    try {
      const res = await axios.put(
        `http://localhost:8800/api/users/deposit/${userId}/${depositId}`,
        {
          depositMoney: {
            state,
            reason,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  // !</USER>

  // !<COİN>

  const createCoin = async (
    coinName,
    shortName,
    purchasePrice,
    salePrice,
    change,
    setCoins,
    img
  ) => {
    try {
      const formData = new FormData();
      formData.append("img", img.file);
      formData.append("coinName", coinName);
      formData.append("shortName", shortName);
      formData.append("purchasePrice", purchasePrice);
      formData.append("salePrice", salePrice);
      formData.append("change", change);
      if (isAuthenticated()) {
        try {
          const res = await axios.post(
            "http://localhost:8800/api/coin",
            formData
          );
          getCoins(setCoins);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCoins = async (setCoins) => {
    try {
      const res = await axios.get("http://localhost:8800/api/coin");
      setCoins(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCoin = async (
    id,
    setCoinName,
    setShortName,
    setPurchasePrice,
    setSalePrice,
    setChange,
    setCoinId
  ) => {
    try {
      const res = await axios.get(`http://localhost:8800/api/coin/${id}`);

      setCoinName(res.data.coinName);
      setShortName(res.data.shortName);
      setPurchasePrice(res.data.purchasePrice);
      setSalePrice(res.data.salePrice);
      setChange(res.data.change);
      setCoinId(res.data._id);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCoin = async (
    id,
    coinName,
    shortName,
    purchasePrice,
    salePrice,
    change,
    setCoins
  ) => {
    if (isAuthenticated()) {
      try {
        const res = await axios.put(`http://localhost:8800/api/coin/${id}`, {
          coinName,
          shortName,
          purchasePrice,
          salePrice,
          change,
        });
        getCoins(setCoins);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteCoin = async (id, setCoins) => {
    if (isAuthenticated()) {
      try {
        await axios.delete(`http://localhost:8800/api/coin/${id}`);
        getCoins(setCoins);
      } catch (error) {}
    }
  };
  // !</COİN>

  // !<BANKS>
  const createBank = async (receivingBank, iban, desc, setBanks) => {
    if (isAuthenticated()) {
      try {
        const res = await axios.post("http://localhost:8800/api/bank", {
          receivingBank,
          iban,
          desc,
        });
        getBanks(setBanks);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getBanks = async (setBanks) => {
    try {
      const res = await axios.get("http://localhost:8800/api/bank");
      setBanks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getBank = async (id, setReceivingBank, setIban, setDesc, setBankId) => {
    try {
      const res = await axios.get(`http://localhost:8800/api/bank/${id}`);

      setReceivingBank(res.data.receivingBank);
      setIban(res.data.iban);
      setDesc(res.data.desc);
      setBankId(res.data._id);
    } catch (error) {
      console.log(error);
    }
  };

  const updateBank = async (id, receivingBank, iban, desc, setBanks) => {
    try {
      const res = await axios.put(`http://localhost:8800/api/bank/${id}`, {
        receivingBank,
        iban,
        desc,
      });

      getBanks(setBanks);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBank = async (id, setBanks) => {
    try {
      await axios.delete(`http://localhost:8800/api/bank/${id}`);
      getBanks(setBanks);
    } catch (error) {}
  };
  // !</BANKS>

  const shareds = {
    submitLogin,
    submitRegister,
    getUserInfo,
    getUsers,
    getUser,
    getUserWithId,
    logOut,
    updateUser,
    deleteUser,
    buyOrSellOrder,
    buyCoin,
    sellCoin,
    withdrawReq,
    depositReq,
    getWithdraw,
    getDeposit,
    updateWithdraw,
    updateDeposit,
    createCoin,
    getCoins,
    getCoin,
    updateCoin,
    deleteCoin,
    createBank,
    getBanks,
    getBank,
    updateBank,
    deleteBank,
    getUserWithUseAuth,
  };

  return <Context.Provider value={shareds}>{children}</Context.Provider>;
}

export { Provider };
export default Context;
