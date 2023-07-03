import "./App.scss";
import { useState, useEffect, useContext } from "react";
import Context from "./context/ContextApi";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomeScreen from "./pages/HomeScreen";
import Footer from "./components/Footer";
import ProfileScreen from "./pages/ProfileScreen";
import NotFoundScreen from "./pages/NotFoundScreen";
import AdminScreen from "./admin/pages/AdminScreen";
import { useIsAuthenticated } from "react-auth-kit";
import Spinner from "./components/Spinner";
import Markets from "./pages/Markets";
import CryptoVolume from "./pages/CryptoVolume";
import ShareVolumes from "./pages/ShareVolumes";
import CryptoTechnicalAnalysis from "./pages/CryptoTechnicalAnalysis";
import CrossRatiosPage from "./pages/CrossRatiosPage";
import ForexHeatPage from "./pages/ForexHeatPage";
import ProfileMenu from "./components/ProfileMenu";
import BalancesScreen from "./pages/BalancesScreen";
import PastProcess from "./pages/PastProcess";
import WithdrawMoney from "./pages/WithdrawMoney";
import DepositMoney from "./pages/DepositMoney";
import RequestWithdraw from "./pages/RequestWithdraw";
import RequestDeposit from "./pages/RequestDeposit";
import SaleCoin from "./pages/SaleCoin";
import Banks from "./admin/components/Banks";
import Coins from "./admin/components/Coins";
import Users from "./admin/components/Users";
import ReqWithdraw from "./admin/components/ReqWithdraw";
import ReqDeposit from "./admin/components/ReqDeposit";
import About from "./pages/About";
import PersonalData from "./pages/PersonalData";
import Privacy from "./pages/Privacy";
import Questions from "./pages/Questions";
import Text from "./pages/Text";
import Agreement from "./pages/Agreement";

function App() {
  const isAuthenticated = useIsAuthenticated();
  const { getUserWithUseAuth } = useContext(Context);
  const navigate = useNavigate();
  const [isNavbar, setIsNavbar] = useState(false);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    getUserWithUseAuth(setUser);

    try {
      if (
        location.pathname === "/" ||
        location.pathname === "/home" ||
        location.pathname === "/markets" ||
        location.pathname === "/crypto-volume" ||
        location.pathname === "/share-volume" ||
        location.pathname === "/crypto-technical-analysis" ||
        location.pathname === "/cross-ratios" ||
        location.pathname === "/heat-map" ||
        location.pathname === "/coins" ||
        location.pathname === "/about" ||
        location.pathname === "/personal-data" ||
        location.pathname === "/privacy" ||
        location.pathname === "/agreement" ||
        location.pathname === "/questions" ||
        location.pathname === "/text"
      ) {
        setIsNavbar(true);
      } else if (
        location.pathname === "/admin" ||
        location.pathname === "/admin/banks" ||
        location.pathname === "/admin/coins" ||
        location.pathname === "/admin/users" ||
        location.pathname === "/admin/withdraw" ||
        location.pathname === "/admin/deposit"
      ) {
        if (user?.isAdmin) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
        setIsNavbar(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [location.pathname, user.length]);

  return (
    <div className="App">
      {loading ? (
        <Spinner />
      ) : (
        <>
          {isNavbar ? <Navbar /> : <></>}
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/coins" element={<SaleCoin />} />
            <Route path="/crypto-volume" element={<CryptoVolume />} />
            <Route path="/share-volume" element={<ShareVolumes />} />
            <Route path="/about" element={<About />} />
            <Route path="/personal-data" element={<PersonalData />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/text" element={<Text />} />

            <Route path="/agreement" element={<Agreement />} />
            <Route
              path="/crypto-technical-analysis"
              element={<CryptoTechnicalAnalysis />}
            />
            <Route path="/cross-ratios" element={<CrossRatiosPage />} />
            <Route path="/heat-map" element={<ForexHeatPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/profile" element={<ProfileMenu />}>
              <Route path="info" element={<ProfileScreen />} />
              <Route path="balances" element={<BalancesScreen />} />
              <Route path="past-process" element={<PastProcess />} />
              <Route path="withdraw-money" element={<WithdrawMoney />} />
              <Route path="deposit-money" element={<DepositMoney />} />
              <Route path="request-withdraw" element={<RequestWithdraw />} />
              <Route path="request-deposit" element={<RequestDeposit />} />
            </Route>

            {isAdmin ? (
              <Route path="/admin" element={<AdminScreen />}>
                <Route path="banks" element={<Banks />} />
                <Route path="coins" element={<Coins />} />
                <Route path="users" element={<Users />} />
                <Route path="withdraw" element={<ReqWithdraw />} />
                <Route path="deposit" element={<ReqDeposit />} />
              </Route>
            ) : (
              <></>
            )}
            <Route path="*" element={<NotFoundScreen />} />
          </Routes>
          {isNavbar ? <Footer /> : <></>}
        </>
      )}
    </div>
  );
}

export default App;
