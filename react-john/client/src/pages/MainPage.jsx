import React, { Component } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MediaCard from "../modules/MediaCard.jsx";
import Grid from '@mui/material/Grid';
import axios from "axios";

const MainPage = ({ role, onSetRole }) => {
  const [tournament, setTournament] = useState([]);

  useEffect(() => {
    const fetchAllTournament = async () => {
      try {
        const res = await axios.get("http://localhost:8800/get/tournament");
        console.log(res.data);
        setTournament(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllTournament();
  }, []);
  const navigate = useNavigate();

  const handleLogoutClick = async (e) => {
    e.preventDefault();
    try {
      onSetRole(0);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const login_button =
    role === 0 ? (
      <div>
        <button className="login">
          <Link to={`/login`}>Log In</Link>
        </button>
      </div>
    ) : (
      <b></b>
    );
  const logout_button =
    role === 0 ? (
      <b></b>
    ) : (
      <div>
        <button className="logout" onClick={handleLogoutClick}>
          Log Out
        </button>
      </div>
    );
  const modify_data_button =
    role === 0 ? (
      <b></b>
    ) : (
      <div>
        <button className="add">
          <Link to={`/add`}>Modify Data</Link>
        </button>
      </div>
    );
  const add_credential_button =
    role === 2 ? (
      <div>
        <button className="add_credential">
          <Link to={`/add_credential`}>Add Credential</Link>
        </button>
      </div>
    ) : (
      <b></b>
    );

  return (
    <div className="form">
      <Grid item xs={12}>
        {tournament.map((tournament) => (
          <MediaCard/>
        ))}
      </Grid>
      {/*        
      {tournament.map((tournament) => (
        <div className="book" key={tournament.year}>
          <p>
            {tournament.year} {tournament.winner} {tournament.host}
          </p>
          <button className="teams">
            <Link to={`/get/matches/${tournament.year}`}>Matches</Link>
          </button>
          <button className="matches">
            <Link to={`/get/team/${tournament.year}`}>Team</Link>
          </button>
        </div>
      ))}
      */}
    </div>
  );
};
export default MainPage;
