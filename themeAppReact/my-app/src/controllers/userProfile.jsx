import React, { useContext } from "react";
import AuthContext from "../context/authContext";

const UserProfile = () => {
  const { userName } = useContext(AuthContext);

  return (
    <div>
      <h2>User Profile: {userName}</h2>
    </div>
  );
};

export default UserProfile;
