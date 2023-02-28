import React, { Component } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
//import { useNavigate } from "react-router-dom";
import axios from "axios";
const Add = ({ role }) => {
  const hasEmpty = (dict) => {
    const list = Object.values(dict);
    for (let i = 0; i < list.length; i++) {
      if (list[i] === null || list[i] === "") {
        return true;
      }
    }
    return false;
  };
  const [team, setTeam] = useState({
    name: "",
    year: null,
  });
  const [tournamentAdd, setTournamentAdd] = useState({
    year: null,
    winner: "",
    host: "",
  });

  const [tournamentUpdate, setTournamentUpdate] = useState({
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
    stage: "default",
    year: null,
    date: null,
    hour: null,
    minute: null,
    city: "",
    temperature: null,
    tickets: null,
  });

  const [matchesUpdate, setMatchesUpdate] = useState({
    team1: "",
    team2: "",
    score1: null,
    score2: null,
    stage: "default",
    year: null,
    date: null,
  });

  const [matchesDelete, setMatchesDelete] = useState({
    team1: "",
    team2: "",
    stage: "default",
    year: null,
  });

  const handleTeamChange = (e) => {
    setTeam((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleTournamentAddChange = (e) => {
    setTournamentAdd((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleTournamentUpdateChange = (e) => {
    setTournamentUpdate((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleTournamentDeleteChange = (e) => {
    setTournamentDelete((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleMatchesAddChange = (e) => {
    //console.log(matchesAdd);
    setMatchesAdd((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleMatchesUpdateChange = (e) => {
    setMatchesUpdate((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleMatchesDeleteChange = (e) => {
    setMatchesDelete((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [teamMsg, setTeamMsg] = useState("");
  const [tournamentAddMsg, setTournamentAddMsg] = useState("");
  const [tournamentUpdateMsg, setTournamentUpdateMsg] = useState("");
  const [tournamentDeleteMsg, setTournamentDeleteMsg] = useState("");
  const [matchesAddMsg, setMatchesAddMsg] = useState("");
  const [matchesUpdateMsg, setMatchesUpdateMsg] = useState("");
  const [matchesDeleteMsg, setMatchesDeleteMsg] = useState("");

  //const navigate = useNavigate();

  const handleMatchesAddClick = async (e) => {
    e.preventDefault();
    try {
      if (hasEmpty(matchesAdd)) {
        setMatchesAddMsg("all fields must be non-empty");
        return;
      }
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

  const handleMatchesUpdateClick = async (e) => {
    e.preventDefault();
    try {
      if (hasEmpty(matchesUpdate)) {
        setMatchesUpdateMsg("all fields must be non-empty");
        return;
      }
      await axios
        .post("http://localhost:8800/add/matches/update", matchesUpdate)
        .then((response) => {
          if (response.data === "Match has been Added") {
            setMatchesUpdateMsg("Match has been Updated");
          } else {
            setMatchesUpdateMsg(response.data);
          }
        });
      //navigate("/");
    } catch (err) {
      console.log(err);
    }
    /*
      let delete_data = "";
      await axios
        .delete(
          "http://localhost:8800/add/matches/delete/" +
            matchesUpdate.team1 +
            "/" +
            matchesUpdate.team2 +
            "/" +
            matchesUpdate.stage +
            "/" +
            matchesUpdate.year
        )
        .then((response) => {
          delete_data = response.data;
        });
      //console.log(delete_data);
      if (delete_data !== "Match has been Deleted") {
        setMatchesUpdateMsg(delete_data);
        return;
      }
      await axios
        .post("http://localhost:8800/add/matches/add", matchesUpdate)
        .then((response) => {
          if (response.data === "Match has been Added") {
            setMatchesUpdateMsg("Match has been Updated");
          } else {
            setMatchesUpdateMsg(response.data);
          }
        });
      //navigate("/");
    } catch (err) {
      console.log(err);
    }*/
  };

  const handleMatchesDeleteClick = async (e) => {
    e.preventDefault();
    try {
      if (hasEmpty(matchesDelete)) {
        setMatchesDeleteMsg("all fields must be non-empty");
        return;
      }
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
      if (hasEmpty(team)) {
        setTeamMsg("all fields must be non-empty");
        return;
      }
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
      if (hasEmpty(team)) {
        setTeamMsg("all fields must be non-empty");
        return;
      }
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
      if (hasEmpty(tournamentAdd)) {
        setTournamentAddMsg("all fields must be non-empty");
        return;
      }
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

  const handleTournamentUpdateClick = async (e) => {
    e.preventDefault();
    try {
      if (hasEmpty(tournamentUpdate)) {
        setTournamentUpdateMsg("all fields must be non-empty");
        return;
      }
      await axios
        .post("http://localhost:8800/add/tournament/update", tournamentUpdate)
        .then((response) => {
          setTournamentUpdateMsg(response.data);
        });
      //navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleTournamentDeleteClick = async (e) => {
    e.preventDefault();
    try {
      if (hasEmpty(tournamentDelete)) {
        setTournamentDeleteMsg("all fields must be non-empty");
        return;
      }
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
  if (role === 2) {
    return (
      <div>
        <b>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </b>
        <button className="add_back">
          <Link to={`/`}>Home</Link>
        </button>
        <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Update Match</h1>
        <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;year </b>
        <input
          type="number"
          placeholder="year"
          onChange={handleMatchesUpdateChange}
          name="year"
        />
        <p></p>
        <b>&nbsp;team 1 </b>
        <input
          type="text"
          placeholder="team1"
          onChange={handleMatchesUpdateChange}
          name="team1"
        />
        <p></p>
        <b>&nbsp;team 2 </b>
        <input
          type="text"
          placeholder="team2"
          onChange={handleMatchesUpdateChange}
          name="team2"
        />
        <p></p>
        <b>score 1 </b>
        <input
          type="number"
          placeholder="score1"
          onChange={handleMatchesUpdateChange}
          name="score1"
        />
        <p></p>
        <b>score 2 </b>
        <input
          type="number"
          placeholder="score2"
          onChange={handleMatchesUpdateChange}
          name="score2"
        />
        <p></p>
        <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;date </b>
        <input
          type="date"
          placeholder="date"
          onChange={handleMatchesUpdateChange}
          name="date"
        />
        <p></p>
        <b>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </b>
        <button onClick={handleMatchesUpdateClick}>Update</button>
        <p>{matchesUpdateMsg}</p>
      </div>
    );
  }
  //const { role } = this.props;
  return (
    <div className="form" style={{ height: 600 }}>
      <div>
        <b>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </b>
        <button className="add_back">
          <Link to={`/`}>Home</Link>
        </button>
        <h1>&nbsp;&nbsp;Add Tournament</h1>
        <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;year </b>
        <input
          type="number"
          placeholder="year"
          onChange={handleTournamentAddChange}
          name="year"
        />
        <p></p>
        <b>&nbsp;winner </b>
        <input
          type="text"
          placeholder="winner"
          onChange={handleTournamentAddChange}
          name="winner"
        />
        <p></p>
        <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;host </b>
        <input
          type="text"
          placeholder="host"
          onChange={handleTournamentAddChange}
          name="host"
        />
        <p></p>
        <b>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </b>
        <button onClick={handleTournamentAddClick}>Add</button>
        <p>{tournamentAddMsg}</p>

        <h1>Update Tournament</h1>
        <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;year </b>
        <input
          type="number"
          placeholder="year"
          onChange={handleTournamentUpdateChange}
          name="year"
        />
        <p></p>
        <b>&nbsp;winner </b>
        <input
          type="text"
          placeholder="winner"
          onChange={handleTournamentUpdateChange}
          name="winner"
        />
        <p></p>
        <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;host </b>
        <input
          type="text"
          placeholder="host"
          onChange={handleTournamentUpdateChange}
          name="host"
        />
        <p></p>
        <b>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </b>
        <button onClick={handleTournamentUpdateClick}>Update</button>
        <p>{tournamentUpdateMsg}</p>

        <h1>Delete Tournament</h1>
        <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;year </b>
        <input
          type="number"
          placeholder="year"
          onChange={handleTournamentDeleteChange}
          name="year"
        />
        <p></p>
        <b>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </b>
        <button onClick={handleTournamentDeleteClick}>Delete</button>
        <p>{tournamentDeleteMsg}</p>
      </div>
      <div>
        <h1>Add / Delete Team in Tournament</h1>
        <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;year </b>
        <input
          type="number"
          placeholder="year"
          onChange={handleTeamChange}
          name="year"
        />
        <p></p>
        <b>&nbsp;&nbsp;&nbsp;name </b>
        <input
          type="text"
          placeholder="name"
          onChange={handleTeamChange}
          name="name"
        />
        <p></p>
        <b>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </b>
        <button onClick={handleTeamAddClick}>Add</button>
        <button onClick={handleTeamDeleteClick}>Delete</button>
        <p>{teamMsg}</p>

        <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Add Match</h1>
        <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;year </b>
        <input
          type="number"
          placeholder="year"
          onChange={handleMatchesAddChange}
          name="year"
        />
        <p></p>
        <b>&nbsp;team 1 </b>
        <input
          type="text"
          placeholder="team1"
          onChange={handleMatchesAddChange}
          name="team1"
        />
        <p></p>
        <b>&nbsp;team 2 </b>
        <input
          type="text"
          placeholder="team2"
          onChange={handleMatchesAddChange}
          name="team2"
        />
        <p></p>
        <b>score 1 </b>
        <input
          type="number"
          placeholder="score1"
          onChange={handleMatchesAddChange}
          name="score1"
        />
        <p></p>
        <b>score 2 </b>
        <input
          type="number"
          placeholder="score2"
          onChange={handleMatchesAddChange}
          name="score2"
        />
        <p></p>
        <b>date </b>
        <input
          type="date"
          placeholder="date"
          onChange={handleMatchesAddChange}
          name="date"
        />
        <p></p>
        <b>start time </b>
        <input
          type="number"
          placeholder="hour"
          onChange={handleMatchesAddChange}
          name="hour"
        />
        <b> : </b>
        <input
          type="number"
          placeholder="minute"
          onChange={handleMatchesAddChange}
          name="minute"
        />
        <p></p>
        <b>&nbsp;&nbsp;&nbsp;&nbsp;city </b>
        <input
          type="text"
          placeholder="city"
          onChange={handleMatchesAddChange}
          name="city"
        />
        <p></p>
        <b>temperature </b>
        <input
          type="number"
          placeholder="temperature"
          onChange={handleMatchesAddChange}
          name="temperature"
        />
        <b>F</b>
        <p></p>
        <b>tickets sold </b>
        <input
          type="number"
          placeholder="tickets"
          onChange={handleMatchesAddChange}
          name="tickets"
        />
        <p></p>
        <b>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </b>
        <button onClick={handleMatchesAddClick}>Add</button>
        <p>{matchesAddMsg}</p>

        <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Update Match</h1>
        <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;year </b>
        <input
          type="number"
          placeholder="year"
          onChange={handleMatchesUpdateChange}
          name="year"
        />
        <p></p>
        <b>&nbsp;team 1 </b>
        <input
          type="text"
          placeholder="team1"
          onChange={handleMatchesUpdateChange}
          name="team1"
        />
        <p></p>
        <b>&nbsp;team 2 </b>
        <input
          type="text"
          placeholder="team2"
          onChange={handleMatchesUpdateChange}
          name="team2"
        />
        <p></p>
        <b>score 1 </b>
        <input
          type="number"
          placeholder="score1"
          onChange={handleMatchesUpdateChange}
          name="score1"
        />
        <p></p>
        <b>score 2 </b>
        <input
          type="number"
          placeholder="score2"
          onChange={handleMatchesUpdateChange}
          name="score2"
        />
        <p></p>
        <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;date </b>
        <input
          type="date"
          placeholder="date"
          onChange={handleMatchesUpdateChange}
          name="date"
        />
        <p></p>
        <b>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </b>
        <button onClick={handleMatchesUpdateClick}>Update</button>
        <p>{matchesUpdateMsg}</p>

        <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Delete Match</h1>
        <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;year </b>
        <input
          type="number"
          placeholder="year"
          onChange={handleMatchesDeleteChange}
          name="year"
        />
        <p></p>
        <b>&nbsp;team 1 </b>
        <input
          type="text"
          placeholder="team1"
          onChange={handleMatchesDeleteChange}
          name="team1"
        />
        <p></p>
        <b>&nbsp;team 2 </b>
        <input
          type="text"
          placeholder="team2"
          onChange={handleMatchesDeleteChange}
          name="team2"
        />
        <p></p>
        <b>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </b>
        <button onClick={handleMatchesDeleteClick}>Delete</button>
        <p>{matchesDeleteMsg}</p>
      </div>
    </div>
  );
};
export default Add;
