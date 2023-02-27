import React, { Component } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import MediaCard from "../modules/MediaCard.jsx";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { CssBaseline, Typography } from "@mui/material";
import axios from "axios";
import '../index.css'
import Header from "../modules/Header.jsx";

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

  return (
    <div className="tournament-page" style={{alignSelf: "flex-start"}}>

      <Header role={role} handleLogoutClick={handleLogoutClick}/>
      
      <Box sx={{pt: 20, pb: 6}}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Tournaments
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Welcome to FIFA! More text can go here.
          </Typography>
        </Container>
      </Box>
      
      <Container sx={{py: 12}} maxWidth="lg">
        <Grid container spacing={2}>
          {tournament.map((tournament, idx) => (
            <Grid item key={idx} xs={12} sm={6} md={4}>
              <MediaCard content={tournament}/>
            </Grid>
          ))}
        </Grid> 
      </Container>
    
    </div>
  );
};

export default MainPage;
