import {React, useContext} from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Context } from "../index";
import toast from "react-hot-toast";
import axios from "axios";
import styled from "styled-components";
export default function Header(){
    const {isAuthenticated,setIsauthenticated,loading,setLoading}=useContext(Context);
    
  const logoutHandler = async () => {
    setLoading(true);
    try {
   const {data}= await axios.get('http://localhost:40000/api/v1/users/logout',  {
        withCredentials: true, // Include credentials
      });
        setIsauthenticated(false);
        toast.success(data.message);
      setLoading(false);
    } catch (error) {
      console.error("Axios error:", error);
      setIsauthenticated(true);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  // Styled component for the Navbar with background animation
const StyledNavbar = styled(Navbar)`
background: linear-gradient(45deg, #ff8a00, #e52e71);
transition: background 0.5s ease;
&:hover {
  background: linear-gradient(45deg, #ff8a00, #e52e71);
}
`;
return (
  <StyledNavbar bg="light" >
  <Container className="justify-content-between">
    <Navbar.Brand>
      <p style={{ color: "white" }}>Todo List</p>
    </Navbar.Brand>
    <Nav>
      {/* Home Link */}
      <Nav.Link
        as={Link}
        to="/home"
        style={{ color: "white", marginRight: "15px" }}
      >
        Home
      </Nav.Link>

      {/* Profile Link */}
      <Nav.Link
        as={Link}
        to="/profile"
        style={{ color: "white", marginRight: "15px" }}
      >
        Profile
      </Nav.Link>

      {/* Logout Button or Login Link */}
      {isAuthenticated ? (
        <Button
          variant="outline-light"
          disabled={loading}
          onClick={logoutHandler}
        >
          Logout
        </Button>
      ) : (
        <Nav.Link
          as={Link}
          to="/login"
          style={{ color: "white", marginRight: "15px" }}
        >
          Login
        </Nav.Link>
      )}
    </Nav>
  </Container>
</StyledNavbar>
)
}