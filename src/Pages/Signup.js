import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:40000/api/v1/users/new', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log(data);

      // Add logic for handling the response as needed
      if (data.error) {
        toast.error("Registration failed");
      } else {
        toast.success("Registration successful");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Some error occurred");
    }
  };

  return (
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
            <button type="submit" className="btn btn-primary">
              Sign up
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Already a member? <a href="/login">Sign in</a>
          </p>
        </div>
      </form>
    </div>
  );
}
