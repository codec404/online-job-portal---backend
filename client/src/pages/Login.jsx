import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputForm from "../components/Shared/InputForm";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { hideLoading, showLoading } from "../Redux/Features/alertSlice";
import Spinner from "../components/Shared/Spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alerts);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      dispatch(showLoading());
      if (!email || !password) {
        throw new Error("Fields");
      }
      const { data } = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (data?.success) {
        dispatch(hideLoading());
        localStorage.setItem("token", data.token);
        toast.success("Login Success");
        navigate("/dashboard");
      }
    } catch (error) {
      // console.log(error);
      if (error.message === "Fields") {
        toast.error("Please provide all fields");
      } else {
        toast.error("Invalid Email/Password");
      }
      dispatch(hideLoading());
    }
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="form-container">
          <form className="card p-3" onSubmit={handleSubmit}>
            <div>
              <img
                src="/assets/images/logo.jpg"
                alt="Logo"
                height={150}
                width={300}
              />
              <InputForm
                labelText={"Email address"}
                htmlFor={"email"}
                inputType={"email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fieldName={"email"}
              />
              <InputForm
                labelText={"Password"}
                htmlFor={"password"}
                inputType={"password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fieldName={"password"}
              />
            </div>
            <div className="d-flex justify-content-between">
              <p>
                New User? <Link to="/register"> Register</Link>
              </p>
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
