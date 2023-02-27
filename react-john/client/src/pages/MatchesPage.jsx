import React, { Component } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import MatchCard from "../modules/MatchCard";
import { Container } from "@mui/system";
import { Stack } from "@mui/material";
import Header from "../modules/Header";

const MatchesPage = ({role, onSetRole}) => {
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
    <Container>
      <Header role={role} handleLogoutClick={handleLogoutClick}/>

      <Container sx={{justifyContent: "start", py: 20, width: '100%'}}>
        <Stack spacing={2}>
          {tournament.map((tournament, idx) => (
            <MatchCard key={idx} content={tournament}/>
          ))}
        </Stack> 
      </Container>
    </Container>
  );
};

export default MatchesPage;
