import React, { Component } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import MatchCard from "../modules/MatchCard";
import { Container } from "@mui/system";
import { Stack } from "@mui/material";
import Header from "../modules/Header";
import Typography from "@mui/material/Typography"
import Button from '@mui/material/Button';


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
    <Container sx={{height: "100vh", maxWidth: '100% !important', mt: "200px", mb: "20px", overflowY: "auto"}}>
      <Header role={role} handleLogoutClick={handleLogoutClick}/>
      <p></p>

      <Link to={`/`}>
            <Button variant="contained" size="medium" sx={{m: 1, fontFamily:"Exo"}} >Home</Button>
        </Link>

      <Typography variant="h2" fontFamily={"Exo"} fontWeight={"bold"} padding={5}> Matches: {year} </Typography>

      <Container sx={{maxHeight: "75vh", justifyContent: "flex-start", maxWidth: '100% !important'}}>
        <Stack spacing={2} sx={{margin: "auto", width: "50%", py: "20px"}}>
          {tournament.map((tournament, idx) => (
            <MatchCard key={idx} content={tournament}/>
          ))}
        </Stack> 
      </Container>
    </Container>
  );
};

export default MatchesPage;
