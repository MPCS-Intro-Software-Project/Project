import React, { Component } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
//import { useNavigate } from "react-router-dom";
import axios from "axios";
const AddCredential = ({ role }) => {
  const [credentialAdd, setCredentialAdd] = useState({
    username: "",
    password: "",
    new_role: null,
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
  if (role !== 2) {
    return (
      <div>
        <button className="add_back">
          <Link to={`/`}>Home</Link>
        </button>
        <h1>Access Denied. Login as Operator First.</h1>
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
      <p>For role: Enter 1 for admin, 2 for operator.</p>
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
      <p>role: </p>
      <input
        type="number"
        placeholder="role"
        onChange={handleCredentialAddChange}
        name="role"
      />
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
      <button onClick={handleCredentialDeleteClick}>Delete</button>
      <p>{credentialDeleteMsg}</p>

      <p>{role}</p>
    </div>
  );
};
export default AddCredential;
