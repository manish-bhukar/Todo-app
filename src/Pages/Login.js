import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Header from "../component/Header";
import { Context } from "../index";
import {Eye, EyeOff} from 'lucide-react';
import "../App.css";
import axios from "axios";
import toast from "react-hot-toast";
export default function (props) {
  const { isAuthenticated, setIsauthenticated, loading, setLoading } =
    useContext(Context);
    const[eye,setEye]=useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:40000/api/v1/users/login",
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include credentials
        }
      );

      const data = response.data;
        setIsauthenticated(true);
        toast.success(data.message);
      setLoading(false);
    } catch (error) {
   
      setIsauthenticated(false);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  if (isAuthenticated) return <Navigate to={"/"} />;
const handleClick=()=>{
  setEye(!eye);
}
  return (
   
    <div>
       <Header></Header>
      <div className="Auth-form-container" onSubmit={handleSubmit}>
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Log In</h3>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                className="form-control mt-1"
                placeholder="Enter email"
                onChange={handleForm}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                
                name="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={handleForm}
                type={eye?'password':'text'}
              />
             {eye?<div className="eye cursor-pointer" onClick={handleClick}>
        <Eye  />
        </div>:<div className="eye cursor-pointer" onClick={handleClick}>
        <EyeOff/> 
        </div>
             }
             </div>
            <p className="forgot-password text-right mt-2">
              Forgot <Link>password</Link>
            </p>
            <div className="d-grid gap-2 mt-3">
              <button disabled={loading} type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
              Not a member? <Link to="/register">Sign up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
