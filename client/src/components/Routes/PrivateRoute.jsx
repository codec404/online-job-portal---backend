import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../Redux/Features/alertSlice";
import axios from "axios";
import { setUser } from "../../Redux/Features/auth/authSlice";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const getUser = async () => {
    try {
      dispatch(showLoading());
      const { data } = await axios.post(
        "/api/v1/user/get-user-data",
        {
          token: localStorage.getItem("token"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    //   console.log(data);
      dispatch(hideLoading());
      if (data?.success) {
        dispatch(setUser(data.data));
      } else {
        localStorage.clear();
        <Navigate to={"/login"} />;
      }
    } catch (error) {
      localStorage.clear();
    //   console.log(error);
      dispatch(hideLoading());
    }
  };

  //LIFECYCLE METHOD --> CONTINUOUS MONITORING
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user && localStorage.getItem("token")) {
      getUser();
    }
  });
  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default PrivateRoute;
