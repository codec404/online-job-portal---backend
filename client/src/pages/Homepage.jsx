import React from "react";
import "../styles/Homepage.css";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <>
      <video autoPlay muted loop id="bgVideo">
        <source src="/assets/videos/job.mp4" type="video/mp4" />
      </video>
      <div className="content">
        <div className="card w-25">
          <img src="/assets/images/logo.jpg" alt="Logo" height={90} width={160}/>
          <div className="card-body">
            <h5 className="card-title">Lorem ipsum dolor sit.</h5>
            <p className="card-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              officiis nesciunt totam recusandae, veritatis cum.
            </p>
            <div className="d-flex align-items-center justify-content-between mt-5">
              <p>
                Not a user? <Link to="/register">Register</Link>
              </p>
              <p>
                <Link to='/login' className="myBtn" style={{textDecoration: "none"}}>Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
