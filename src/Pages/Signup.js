import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Header from "../component/Header";
import { Context } from "../index";
export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const { isAuthenticated, setIsauthenticated ,loading,setLoading} = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:40000/api/v1/users/new",
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include credentials
        }
      );

      const data = response.data;
      console.log(data);

      // Add logic for handling the response as needed
      if (data.error) {
        toast.error("Registration failed");
        
      } else {
        setIsauthenticated(true);
        setLoading(false);
        toast.success(data.message);
      }
    } catch (error) {
      console.error("Axios error:", error);
      setIsauthenticated(false);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) return <Navigate to={"/"} />;
  return (
    <div>
      <Header></Header>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="form-group mt-3">
              <label>Name</label>
              <input
                value={form.name}
                type="text"
                name="name"
                className="form-control mt-1"
                placeholder="Enter name"
                onChange={handleForm}
              />
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                value={form.email}
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
                value={form.password}
                type="password"
                name="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={handleForm}
              />
            </div>

            <div className="d-grid gap-2 mt-3">
              <button disabled={loading} type="submit" className="btn btn-primary">
                Sign up
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
              Already a member? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
