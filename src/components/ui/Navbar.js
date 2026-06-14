import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startLogout } from "../../actions/auth";
 
export const Navbar = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
 
  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };
 
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
 
    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);
 
  const handleLogout = () => {
    dispatch(startLogout());
  };
  console.log(isOnline);
  
 
  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <span className="navbar-brand">{name}</span>
      {isOnline ? (
        <span className="text-success">Online</span>
      ) : (
        <span className="text-danger">Offline</span>
      )}
      <button className="btn btn-outline-danger" onClick={handleLogout}>
        <i className="fas fa-sign-out-alt"></i>
        <span> Salir</span>
      </button>
    </div>
  );
};