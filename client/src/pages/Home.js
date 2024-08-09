import axios from "axios";
import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  setOnlineUser,
  setSocketConnection,
  setUser,
} from "../redux/userSlice";
import logo from "../assets/logo.png";
import Sidebar from "../components/Sidebar";

import io from "socket.io-client";

const Home = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const fetchUserDetails = async () => {
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`;
      const response = await axios({
        url: URL,
        withCredentials: true,
      });

      dispatch(setUser(response.data.data));

      if (response.data.data.logout) {
        dispatch(logout());
        navigate("/email");
      }
      console.log("current user Details", response);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);
  const basePath = location.pathname === "/";

  useEffect(() => {
    const socketConnection = io(process.env.REACT_APP_BACKEND_URL, {
      withCredentials: true,
      transports: ["websocket"],
      auth: {
        token: localStorage.getItem("token") || "",
      },
    });
    socketConnection.on("connect", () => {
      dispatch(setSocketConnection(socketConnection));
      console.log("Connected to server");
    });
    socketConnection.on("connect_error", (err) => {
      console.log("connect_error");
    });

    socketConnection.on("onlineUser", (user) => {
      dispatch(setOnlineUser(user));
      console.log("onlineUser", user);
    });
    return () => {
      socketConnection.disconnect();
    };
  }, []);
  return (
    <div className="grid lg:grid-cols-[300px,1fr] h-screen max-h-screen">
      <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
        <Sidebar />
      </section>

      {/**message component**/}
      <section className={`${basePath && "hidden"}`}>
        <Outlet />
      </section>

      <div
        className={`justify-center items-center flex-col gap-2 hidden ${
          !basePath ? "hidden" : "lg:flex"
        }`}
      >
        <div>
          <img src={logo} width={250} alt="logo" />
        </div>
        <p className="text-lg mt-2 text-slate-500">
          Select user to send message
        </p>
      </div>
    </div>
  );
};

export default Home;
