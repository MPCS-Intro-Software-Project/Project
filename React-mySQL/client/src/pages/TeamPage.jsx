import React, { Component } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../modules/Header";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
const TeamPage = ({role, onSetRole}) => {
  const [tournament, setTournament] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const year = location.pathname.split("/").reverse()[0];
  useEffect(() => {
    const fetchAllTournament = async () => {
      try {
        const res = await axios.get("http://localhost:8800/get/team/" + year);
        //console.log(res.data);
        setTournament(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllTournament();
  }, []);
  const handleLogoutClick = async (e) => {
    e.preventDefault();
    try {
      onSetRole(0);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container sx={{height: "100vh", maxWidth: '100% !important', mt: "200px", mb: "20px", overflowY: "auto"}}>
      <Header role={role} handleLogoutClick={handleLogoutClick}/>
      <p></p>
      <button className="login_back">
        <Link to={`/`}>Home</Link>
      </button>
      <h1>Teams of Year {year}</h1>
      <div className="matches">
        {tournament.map((tournament) => (
          <div className="book" key={tournament.name}>
            <p>{tournament.name}</p>
          </div>
        ))}
      </div>
    </Container>
  );
};
export default TeamPage;
