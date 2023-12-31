import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css"
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
 import './App.css';
import { useEffect, useState } from 'react';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
const router=createBrowserRouter([
  {
    path:"/login",
    element:
    <Login></Login>
  },
  {
    path:"/",
    element:
    <Signup></Signup>
  }
])
function App() {


  return (
    <div>
    <RouterProvider router={router}></RouterProvider>
    </div>
  )

}
export default App;