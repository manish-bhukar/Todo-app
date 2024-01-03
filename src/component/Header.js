import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import toast from "react-hot-toast";
import axios from "axios";
import styled from "styled-components";
import { Context } from "../index";
import "../App.css";

const StyledNavbar = styled(Navbar)`
  background: linear-gradient(45deg, #ff8a00, #e52e71);
  transition: background 0.5s ease;
  &:hover {
    background: linear-gradient(45deg, #ff8a00, #e52e71);
  }
`;

const StyledContainer = styled(Container)`
  padding-right: 0;
  padding-left: 0;
`;

const StyledNav = styled(Nav)`
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const StyledNavLink = styled(Nav.Link)`
  color: white;
  margin-right: 15px;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

const StyledButton = styled(Button)`
  color: white;
  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

export default function Header() {
  const { isAuthenticated, setIsauthenticated, loading, setLoading } =
    useContext(Context);

  const logoutHandler = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "http://localhost:40000/api/v1/users/logout",
        {
          withCredentials: true,
        }
      );
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

  return (
    <StyledNavbar bg="light" expand="md">
      <StyledContainer fluid className="justify-content-between">
        <Navbar.Brand>
          <p style={{ color: "white" }}>Todo List</p>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <StyledNav className="ml-auto">
            <StyledNavLink as={Link} to="/">
              Home
            </StyledNavLink>
            <StyledNavLink as={Link} to="/profile">
              Profile
            </StyledNavLink>
            {isAuthenticated ? (
              <StyledButton
                variant="outline-light"
                disabled={loading}
                onClick={logoutHandler}
              >
                Logout
              </StyledButton>
            ) : (
              <StyledNavLink as={Link} to="/login">
                Login
              </StyledNavLink>
            )}
          </StyledNav>
        </Navbar.Collapse>
      </StyledContainer>
    </StyledNavbar>
  );
}
