import React, { useContext } from "react";
import styled from "styled-components"; // Import styled-components for styling
import Header from "../component/Header";
import Loader from "../component/Loader";
import { Context } from "../index";
import { Navigate } from "react-router-dom";

// Styled components for better styling
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// const Avatar = styled.jpeg`
//   width: 150px;
//   height: 150px;
//   border-radius: 50%;
//   margin-bottom: 20px;
// `;

const UserInfo = styled.div`
  text-align: center;
`;

export default function Profile() {
  const { user, isAuthenticated, loading } = useContext(Context);

  // Function to determine the avatar based on gender
 
if(!isAuthenticated) return <Navigate to={"/login"}></Navigate>
  return (
    <div>
      <Header />
      <ProfileContainer>
        {loading ? (
          <Loader />
        ) : (
          <div>
          
            <UserInfo>
              <h1>{user.name}</h1>
              <p>{user.email}</p>
            </UserInfo>
          </div>
        )}
      </ProfileContainer>
    </div>
  );
}
