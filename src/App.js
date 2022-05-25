import "./App.css";
import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import {
  Home,
  Transaction,
  AddMusic,
  AddArtis,
  Pricing,
  UserComplain,
  AdminComplain,
} from "./pages/Index";

import { UserContext } from "./context/userContext";
import { setAuthToken, API } from "./config/api";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const navigate = useNavigate();

  // Init user context
  const [dispatch] = useContext(UserContext);

  // Create function for "check user token"
  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transactions" element={<Transaction />} />
        <Route path="/pay" element={<Pricing />} />
        <Route path="/add-music" element={<AddMusic />} />
        <Route path="/add-artis" element={<AddArtis />} />
        <Route exact path="/complain" element={<AdminComplain />} />
        <Route exact path="/user-complain" element={<UserComplain />} />
      </Routes>
    </>
  );
}

export default App;
