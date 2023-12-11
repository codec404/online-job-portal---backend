import React from "react";
import "../../styles/Layout.css";
import { userMenu } from "./Menu/UserMenu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children, username = "Saptarshi" }) => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.clear()
    toast.success("Successfully Logged out")
    navigate("/login");
  }
  const location = useLocation();
  return (
    <>
      <div className="row g-0 bg-dark text-light">
        <div className="col-md-3 sidebar">
          <div className="logo">
            <h6>JOB PORTAL</h6>
          </div>
          <hr />
          <p className="text-center text-warning">Welcome : {username}</p>
          <hr />
          <div className="menu">
            {userMenu.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div className={`menu-item ${isActive && "active"}`}>
                  <i className={menu.icon}></i>
                  <Link
                    to={menu.path}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    {menu.name}
                  </Link>
                </div>
              );
            })}
            <div className="menu-item" onClick = {logoutHandler}>
            <i className="fa-solid fa-right-from-bracket" />
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "white" }}
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-9">{children}</div>
      </div>
    </>
  );
};

export default Layout;
