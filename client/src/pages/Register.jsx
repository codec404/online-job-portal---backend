import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputForm from "../components/Shared/InputForm";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
    } catch (error) {
      console.log(error);
    }
  };

  //We use Alternative method but this is better and user friendly
  //Single State
  // const [values,setValues] = useState({
  //     name: "",
  //     email: "",
  //     password: ""
  // })

  // const handleChange = (e) =>{
  //     const value = e.target.value;
  //     setValues({
  //         ...values,
  //         [e.target.name]: value
  //     })
  // }
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
              labelText={"Name"}
              htmlFor={"name"}
              inputType={"text"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              fieldName={"name"}
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
              Already registered? <Link to="/login"> Login</Link>
            </p>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
