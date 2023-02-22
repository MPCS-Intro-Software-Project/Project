import React, { Component } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
const TeamPage = () => {
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

  return (
    <div className="form">
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
    </div>
  );
};
export default TeamPage;
