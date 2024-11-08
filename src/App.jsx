import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./features/Auth/Login";
import { useSelector } from "react-redux";
import Protected from "./features/Auth/Protected";
import moment from "moment-timezone";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Example from "./features/test/test";
import Dashboard from "./features/Dashboard/Dashboard";
import Signup from "./features/Auth/Signup";

function App() {
  moment.tz.setDefault();
  const store_token = useSelector((state) => state.auth.JWTtoken);
  const storage_token = localStorage.getItem("token");

  if (!!store_token || !!storage_token) {
    return (
      <Protected>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition="bounce"
        />
        <Routes>
          <Route path="*" Component={Dashboard} />
        </Routes>
      </Protected>
    );
  }
  return (
    <Routes>
      <Route path="*" Component={Login} />
      <Route path="/signup" Component={Signup} />
    </Routes>
  );
}

export default App;
