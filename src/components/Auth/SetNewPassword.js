import { CognitoUser } from "amazon-cognito-identity-js";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config";

export default function SetNewPassword(props) {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");

  const handleNewPassword = (newPassword) => {
    const user = new CognitoUser({
      Username: props.username,
      Pool: config.UserPool,
    });

    user.completeNewPasswordChallenge(newPassword, null, {
      onSuccess: (result) => {
        navigate("/login");
      },
      onFailure: (err) => {
        console.error("onFailure:", err);
      },
    });
  };

  return (
    <div>
      <label>New Password: </label>
      <input
        type="text"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button type="password" onClick={() => handleNewPassword(newPassword)}>
        Submit
      </button>
    </div>
  );
}
