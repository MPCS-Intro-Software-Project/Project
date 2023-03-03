import React, { Component } from "react";
import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

const Login = ({ role, onSetRole, username, onSetUsername }) => {
  const navigate = useNavigate();
  const [credential, setCredential] = useState({
    username: "",
    password: "",
  });

  const handleCredentialChange = (e) => {
    setCredential((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [credentialMsg, setCredentialMsg] = useState("");

  //const navigate = useNavigate();

  const handleLoginClick = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:8800/login/login", credential)
        .then((response) => {
          const listAndRole = response.data.split("/");
          const success = parseInt(listAndRole[0]);
          setCredentialMsg(listAndRole[1]);
          if (success > 0) {
            onSetUsername(credential.username);
            onSetRole(parseInt(listAndRole[2]));
            navigate("/");
          }
        });
      //navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  //const { role } = this.props;
  return (
    <div className="form">
        <Link to={`/`}>
            <Button variant="contained" size="medium" sx={{m: 1, fontFamily:"Exo", mb:5, mt:0}} >Home</Button>
        </Link>
      <h1>Login</h1>
      <p>Username: </p>
      <input
        type="text"
        placeholder="username"
        onChange={handleCredentialChange}
        name="username"
      />
      <p></p>
      <p>Password: </p>
      <input
        type="text"
        placeholder="password"
        onChange={handleCredentialChange}
        name="password"
      />
      <p></p>
      <Button onClick={handleLoginClick} variant="contained" size="medium" sx={{m: 1, fontFamily:"Exo", mb:5, mt:2}} >Login</Button>
      {/* <button onClick={handleLoginClick}>Login</button> */}
      <p>{credentialMsg}</p>
    </div>
  );
};
export default Login;
