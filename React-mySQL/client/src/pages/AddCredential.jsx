import React, { Component } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
//import { useNavigate } from "react-router-dom";
import axios from "axios";
const AddCredential = ({ role, username, onSetUsername }) => {
  const hasEmpty = (dict) => {
    const list = Object.values(dict);
    for (let i = 0; i < list.length; i++) {
      if (list[i] === null || list[i] === "") {
        return true;
      }
    }
    return false;
  };
  const [credentialAdd, setCredentialAdd] = useState({
    username: "",
    password: "",
    role: null,
  });

  const [credentialDelete, setCredentialDelete] = useState({
    username: "",
  });

  const handleCredentialAddChange = (e) => {
    setCredentialAdd((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleCredentialDeleteChange = (e) => {
    setCredentialDelete((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const [credentialAddMsg, setCredentialAddMsg] = useState("");
  const [credentialDeleteMsg, setCredentialDeleteMsg] = useState("");

  //const navigate = useNavigate();

  const handleCredentialAddClick = async (e) => {
    e.preventDefault();
    try {
      if (hasEmpty(credentialAdd)) {
        setCredentialAddMsg("all fields must be non-empty");
        return;
      }
      if (credentialAdd.role != 1 && credentialAdd.role != 2) {
        setCredentialAddMsg("role can only be 1 or 2");
        return;
      }
      await axios
        .post("http://localhost:8800/add_credential/add", credentialAdd)
        .then((response) => {
          setCredentialAddMsg(response.data);
        });
      //navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleCredentialDeleteClick = async (e) => {
    e.preventDefault();
    try {
      if (hasEmpty(credentialDelete)) {
        setCredentialDeleteMsg("all fields must be non-empty");
        return;
      }
      //console.log(username + " " + credentialDelete.username);
      if(username === credentialDelete.username){
        setCredentialDeleteMsg("cannot delete self");
        return;
      }
      await axios
        .delete(
          "http://localhost:8800/add_credential/delete/" +
            credentialDelete.username
        )
        .then((response) => {
          setCredentialDeleteMsg(response.data);
        });
    } catch (err) {
      console.log(err);
    }
  };
  if (role !== 1) {
    return (
      <div>
        <button className="add_back">
          <Link to={`/`}>Home</Link>
        </button>
        <h1>Access Denied. Login as Admin First.</h1>
      </div>
    );
  }
  //const { role } = this.props;
  return (
    <div className="form">
      <button className="add_back">
        <Link to={`/`}>Home</Link>
      </button>
      <h1>Add Credential</h1>
      <p>username: </p>
      <input
        type="text"
        placeholder="username"
        onChange={handleCredentialAddChange}
        name="username"
      />
      <p></p>
      <p>password: </p>
      <input
        type="text"
        placeholder="password"
        onChange={handleCredentialAddChange}
        name="password"
      />
      <p></p>
      <p>role: 1 for admin, 2 for operator</p>
      <input
        type="number"
        placeholder="role"
        onChange={handleCredentialAddChange}
        name="role"
      />
      <p></p>
      <button onClick={handleCredentialAddClick}>Add</button>
      <p>{credentialAddMsg}</p>

      <h1>Delete Credential</h1>
      <p>username: </p>
      <input
        type="text"
        placeholder="username"
        onChange={handleCredentialDeleteChange}
        name="username"
      />
      <p></p>
      <button onClick={handleCredentialDeleteClick}>Delete</button>
      <p>{credentialDeleteMsg}</p>

    </div>
  );
};
export default AddCredential;
