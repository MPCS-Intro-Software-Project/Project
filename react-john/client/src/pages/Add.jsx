import React, { Component } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
//import { useNavigate } from "react-router-dom";
import axios from "axios";
const Add = ({ role }) => {
  const [team, setTeam] = useState({
    name: "",
    year: null,
  });
  const [tournamentAdd, setTournamentAdd] = useState({
    year: null,
    winner: "",
    host: "",
  });

  const [tournamentDelete, setTournamentDelete] = useState({
    year: null,
  });

  const [matchesAdd, setMatchesAdd] = useState({
    team1: "",
    team2: "",
    score1: null,
    score2: null,
    stage: "",
    year: null,
  });

  const [matchesDelete, setMatchesDelete] = useState({
    team1: "",
    team2: "",
    stage: "",
    year: null,
  });

  const handleTeamChange = (e) => {
    console.log(role);
    setTeam((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleTournamentAddChange = (e) => {
    setTournamentAdd((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleTournamentDeleteChange = (e) => {
    setTournamentDelete((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleMatchesAddChange = (e) => {
    setMatchesAdd((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleMatchesDeleteChange = (e) => {
    setMatchesDelete((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [teamMsg, setTeamMsg] = useState("");
  const [tournamentAddMsg, setTournamentAddMsg] = useState("");
  const [tournamentDeleteMsg, setTournamentDeleteMsg] = useState("");
  const [matchesAddMsg, setMatchesAddMsg] = useState("");
  const [matchesDeleteMsg, setMatchesDeleteMsg] = useState("");

  //const navigate = useNavigate();

  const handleMatchesAddClick = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:8800/add/matches/add", matchesAdd)
        .then((response) => {
          setMatchesAddMsg(response.data);
        });
      //navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleMatchesDeleteClick = async (e) => {
    e.preventDefault();
    try {
      await axios
        .delete(
          "http://localhost:8800/add/matches/delete/" +
            matchesDelete.team1 +
            "/" +
            matchesDelete.team2 +
            "/" +
            matchesDelete.stage +
            "/" +
            matchesDelete.year
        )
        .then((response) => {
          setMatchesDeleteMsg(response.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleTeamAddClick = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:8800/add/team/add", team)
        .then((response) => {
          setTeamMsg(response.data);
        });
      //navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleTeamDeleteClick = async (e) => {
    e.preventDefault();
    try {
      await axios
        .delete(
          "http://localhost:8800/add/team/delete/" + team.name + "/" + team.year
        )
        .then((response) => {
          setTeamMsg(response.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleTournamentAddClick = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:8800/add/tournament/add", tournamentAdd)
        .then((response) => {
          setTournamentAddMsg(response.data);
        });
      //navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleTournamentDeleteClick = async (e) => {
    e.preventDefault();
    try {
      await axios
        .delete(
          "http://localhost:8800/add/tournament/delete/" + tournamentDelete.year
        )
        .then((response) => {
          setTournamentDeleteMsg(response.data);
        });
    } catch (err) {
      console.log(err);
    }
  };
  if (role === 0) {
    return (
      <div>
        <button className="add_back">
          <Link to={`/`}>Home</Link>
        </button>
        <h1>Access Denied. Login First.</h1>
      </div>
    );
  }
  //const { role } = this.props;
  return (
    <div className="form">
      <button className="add_back">
        <Link to={`/`}>Home</Link>
      </button>
      <h1>Add Tournament</h1>
      <input
        type="number"
        placeholder="year"
        onChange={handleTournamentAddChange}
        name="year"
      />
      <input
        type="text"
        placeholder="winner"
        onChange={handleTournamentAddChange}
        name="winner"
      />
      <input
        type="text"
        placeholder="host"
        onChange={handleTournamentAddChange}
        name="host"
      />
      <button onClick={handleTournamentAddClick}>Add</button>
      <p>{tournamentAddMsg}</p>

      <h1>Delete Tournament</h1>
      <input
        type="number"
        placeholder="year"
        onChange={handleTournamentDeleteChange}
        name="year"
      />
      <button onClick={handleTournamentDeleteClick}>Delete</button>
      <p>{tournamentDeleteMsg}</p>

      <h1>Update Team in Tournament</h1>
      <input
        type="number"
        placeholder="year"
        onChange={handleTeamChange}
        name="year"
      />
      <input
        type="text"
        placeholder="name"
        onChange={handleTeamChange}
        name="name"
      />
      <button onClick={handleTeamAddClick}>Add</button>
      <button onClick={handleTeamDeleteClick}>Delete</button>
      <p>{teamMsg}</p>

      <h1>Add Match</h1>
      <input
        type="number"
        placeholder="year"
        onChange={handleMatchesAddChange}
        name="year"
      />
      <input
        type="text"
        placeholder="team1"
        onChange={handleMatchesAddChange}
        name="team1"
      />
      <input
        type="text"
        placeholder="team2"
        onChange={handleMatchesAddChange}
        name="team2"
      />
      <input
        type="number"
        placeholder="score1"
        onChange={handleMatchesAddChange}
        name="score1"
      />
      <input
        type="number"
        placeholder="score2"
        onChange={handleMatchesAddChange}
        name="score2"
      />
      <input
        type="text"
        placeholder="stage"
        onChange={handleMatchesAddChange}
        name="stage"
      />
      <button onClick={handleMatchesAddClick}>Add</button>
      <p>{matchesAddMsg}</p>

      <h1>Delete Match</h1>
      <input
        type="number"
        placeholder="year"
        onChange={handleMatchesDeleteChange}
        name="year"
      />
      <input
        type="text"
        placeholder="team1"
        onChange={handleMatchesDeleteChange}
        name="team1"
      />
      <input
        type="text"
        placeholder="team2"
        onChange={handleMatchesDeleteChange}
        name="team2"
      />
      <input
        type="text"
        placeholder="stage"
        onChange={handleMatchesDeleteChange}
        name="stage"
      />
      <button onClick={handleMatchesDeleteClick}>Delete</button>
      <p>{matchesDeleteMsg}</p>
      <p>{role}</p>
    </div>
  );
};
export default Add;
