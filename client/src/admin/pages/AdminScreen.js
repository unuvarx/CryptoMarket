import React, { useState, useEffect, useContext } from "react";
import SideBar from "../components/SideBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";
import Context from "../../context/ContextApi";
import Coins from "../components/Coins";

function AdminScreen() {
  // <middleware>
  const { getUserWithUseAuth } = useContext(Context);
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    try {
      getUserWithUseAuth(setUser);
      if (!isAuthenticated()) {
        navigate("/login");
      } else {
        if (user.username && !user.isAdmin) {
          navigate("/login");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [user?.length]);

  // </middleware>
  return (
    <div className="admin-container">
      
      <SideBar />
      <Outlet />
    </div>
  );
}

export default AdminScreen;
