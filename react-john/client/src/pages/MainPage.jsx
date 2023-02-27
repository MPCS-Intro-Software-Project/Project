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
    <div className="tournament-page">

      <Header/>
      
      <Box
      sx={{
        pt: 8,
        pb: 6,
      }}
      >
        <Container maxWidth="sm" sx={{margin: "auto"}}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Album layout
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Something short and leading about the collection below—its contents,
            the creator, etc. Make it short and sweet, but not too short so folks
            don&apos;t simply skip over it entirely.
          </Typography>
        </Container>
      </Box>
      
      <Container sx={{
        py: 8
      }} maxWidth="lg">
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
