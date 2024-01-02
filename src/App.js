import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css"
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
 import './App.css';
import { useContext, useEffect, useState } from 'react';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import { Toaster } from 'react-hot-toast';
import Profile from './Pages/Profile';
import Header from './component/Header';
import { Context } from './index';
import axios from 'axios';

const router=createBrowserRouter([
  {
    path:"/login",
    element:
    <Login></Login>
  },
  {
    path:"/register",
    element:
    <Signup></Signup>
  },
  {
    path:"/home",
    element:<Home></Home>
  }
  ,{
    path:"/profile",
 element:<Profile></Profile>
  }
])
function App() {
const {setUser,setIsauthenticated,setLoading,loading}=useContext(Context);
useEffect(()=>{
  setLoading(true);
  axios.get("http://localhost:40000/api/v1/users/profile",{
    withCredentials:true,
  })
  .then((res)=>{
    setUser(res.data.user);
    setIsauthenticated(true);
    setLoading(false);
  }).catch((error)=>{
    setUser({});
    setIsauthenticated(false);
    setLoading(false);
  })
},[loading])
  return (
    <div>
    <RouterProvider router={router}>
    </RouterProvider>
    <Toaster></Toaster>
    </div>
  )

}
export default App;