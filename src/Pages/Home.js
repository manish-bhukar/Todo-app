import React, { useContext, useEffect, useState } from "react";
import Header from "../component/Header";
import { Context } from "../index";
import toast from "react-hot-toast";
import axios from "axios";
import Todotask from "../component/Todotask";
import { Navigate } from "react-router-dom";
export default function () {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh,setRefresh]=useState(false);
  const {isAuthenticated}=useContext(Context);
  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  const updateHandler =async (id) => {
    try{
  const {data}=  await axios.put(`http://localhost:40000/api/v1/task/${id}`,{},{
    withCredentials:true
  })
  toast.success("success");
  setRefresh(prev=>!prev);

    }
    catch(e){
        toast.error(e.response.data.message);
    }
  };
  const deleteHandler =async (id) => {
    try{
        const {data}=  await axios.delete(`http://localhost:40000/api/v1/task/${id}`,{
          withCredentials:true
        })
        toast.success(data.message);
        setRefresh(prev=>!prev);

          }
          catch(e){
              toast.error(e.response.data.message);
          }
  };
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
        "http://localhost:40000/api/v1/task/addtask",
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include credentials
        }
      );
      const data = response.data;
      toast.success(data.message);
      setForm({
        ...form,
        title: "",
        description: "",
      });
      setLoading(false);
      setRefresh(prev=>!prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    axios
      .get("http://localhost:40000/api/v1/task/my", {
        withCredentials: true,
      })
      .then((res) => {
        const { task } = res.data;
        setTasks(task);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, [refresh]);
  if(!isAuthenticated) return <Navigate to="/login"/>;
  return (
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
              <button
                disabled={loading}
                type="submit"
                className="btn btn-primary"
              >
                Add Task
              </button>
            </div>
          </div>
        </form>
      </div>
      {tasks.map((e) => (
        <Todotask
          title={e.title}
          description={e.description}
          iscompleted={e.iscompleted}
          updateHandler={updateHandler}
          deleteHandler={deleteHandler}
          id={e._id}
        />
      ))}
    </div>
  );
}
