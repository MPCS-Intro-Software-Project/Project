import React, { Component } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import MatchCard from "../modules/MatchCard";
import { Container } from "@mui/system";
import { Grid } from "@mui/material";

const MatchesPage = () => {
  const [tournament, setTournament] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const year = location.pathname.split("/").reverse()[0];
  useEffect(() => {
    const fetchAllTournament = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/get/matches/" + year
        );
        //console.log(res.data);
        setTournament(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllTournament();
  }, []);

  return (
    <div>
      <Container sx={{py: 12}} maxWidth="lg">
        <Grid container spacing={2}>
          {tournament.map((tournament, idx) => (
            <Grid item key={idx} xs={12} sm={12} md={12}>
              <MatchCard content={tournament}/>
            </Grid>
          ))}
        </Grid> 
      </Container>
    {/*
    <div className="form">
      <button className="login_back">
        <Link to={`/`}>Home</Link>
      </button>
      <h1>Matches of Year {year}</h1>
      <div className="matches">
        {tournament.map((tournament) => (
          <div className="book" key={tournament.team1 + " " + tournament.team2}>
            <p>
              Stage: {tournament.stage} | {tournament.team1} {tournament.score1}{" "}
              : {tournament.team2} {tournament.score2}
            </p>
          </div>
        ))}
      </div>
    </div>
        */}
    </div>
  );
};
export default MatchesPage;
