import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputForm from "../components/Shared/InputForm";
//Dispatch -> request, Selector -> get
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../Redux/Features/alertSlice";
import axios from "axios";
import Spinner from "../components/Shared/Spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading } = useSelector((state) => state.alerts);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!name || !email || !password) {
        throw new Error("Field");
      }
      dispatch(showLoading());
      //NETWORK REQUEST TO BACKEND --> PROXY
      const { data } = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
      });
      dispatch(hideLoading());
      if (data?.success) {
        toast.success("Registered Successfully");
        navigate("/login");
      }
    } catch (error) {
      if (error.message === "Field") {
        toast.error("Provide all fields !!!");
      } else {
        toast.error("Invalid Credentials");
      }
      // console.log(error);
      dispatch(hideLoading());
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
      )}
    </>
  );
};

export default Register;
