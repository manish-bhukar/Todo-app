import React, { useContext, useState } from "react";
import Header from "../component/Header";
import { Context } from "../index";
import toast from "react-hot-toast";
import axios from "axios";
export default function(){
    const {loading,setLoading,setIsauthenticated}=useContext(Context);
    const [form, setForm] = useState({
        title: "",
        description: "",
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
          console.log(data);
    
    
            setIsauthenticated(true);
            toast.success(data.message);
          setLoading(false);
        } catch (error) {
          console.error("Axios error:", error);
          setIsauthenticated(false);
          toast.error(error.response.data.message);
          setLoading(false);
        }
      };
    return(
         <div>
            <Header></Header>
            <div className="Auth-form-container" onSubmit={handleSubmit}>
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Todo Task</h3>
            <div className="form-group mt-3">
              <label>Title</label>
              <input
                type="text"
                name="title"
                className="form-control mt-1"
                placeholder="Enter title"
                onChange={handleForm}
              />
            </div>
            <div className="form-group mt-3">
              <label>Description</label>
              <input
                type="text"
                name="description"
                className="form-control mt-1"
                placeholder="Enter description"
                onChange={handleForm}
              />
            </div>
           
            <div className="d-grid gap-2 mt-3">
              <button disabled={loading} type="submit" className="btn btn-primary">
                Add Task
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    )
}