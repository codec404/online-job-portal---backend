import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputForm from "../components/Shared/InputForm";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
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
    </>
  );
};

export default Login;
