import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "591001sam",
  database: "database_practice",
});

app.use(express.json());
app.use(cors());

app.post("/login/login", (req, res) => {
  const values = [req.body.username, req.body.password];
  const check_login =
    "SELECT role FROM credential WHERE `username` = ? AND `password` = ?";
  db.query(check_login, values, (err, data) => {
    if (err) return res.json(err);
    if (data.length == 0) return res.json("0/Wrong username or password/0");
    return res.json("1/Successful Login/" + data[0].role);
  });
});

app.post("/add_credential/add", (req, res) => {
  const values = [req.body.username, req.body.password, req.body.role];
  const check_dup = "SELECT * FROM credential WHERE `username` = ?";
  db.query(check_dup, [values[0]], (err, data) => {
    if (err) return res.json(err);
    if (data.length > 0)
      return res.json(
        "Username already taken. Try another one or delete user with this username first."
      );
    const insertion =
      "INSERT INTO credential (`username`,`password`, `role`) VALUES (?)";
    db.query(insertion, [values], (err, data) => {
      if (err) return res.json(err);
      return res.json("Successfully added user!");
    });
  });
});

app.delete("/add_credential/delete/:username", (req, res) => {
  const values = [req.params.username];
  const check_dup = "SELECT * FROM credential WHERE `username` = ?";
  db.query(check_dup, [values[0]], (err, data) => {
    if (err) return res.json(err);
    if (data.length == 0) return res.json("user doesn't exist.");
    const deletion = "DELETE FROM credential WHERE `username` = ?";
    db.query(deletion, [values[0]], (err, data) => {
      if (err) return res.json(err);
      return res.json("Successfully deleted user!");
    });
  });
});

app.post("/add/matches/add", (req, res) => {
  if (req.body.team1 == req.body.team2) {
    return res.json("same team on both side");
  }
  const values = [
    req.body.team1 < req.body.team2 ? req.body.team1 : req.body.team2,
    req.body.team1 < req.body.team2 ? req.body.team2 : req.body.team1,
    req.body.team1 < req.body.team2 ? req.body.score1 : req.body.score2,
    req.body.team1 < req.body.team2 ? req.body.score2 : req.body.score1,
    req.body.stage,
    req.body.year,
  ];
  const check_tournament = "SELECT * FROM tournament WHERE `year` = ?";
  db.query(check_tournament, values[5], (err, data) => {
    if (err) return res.json(err);
    if (data.length == 0)
      return res.json(
        "No tournament in year: " + values[5] + ". Add Tournament First"
      );
    const team_present = "SELECT * FROM team WHERE `year` = ? AND `name` = ?";
    db.query(team_present, [values[5], values[0]], (err, data) => {
      if (err) return res.json(err);
      if (data.length == 0)
        return res.json("Team " + values[0] + " not present. Add team first.");
      db.query(team_present, [values[5], values[1]], (err, data) => {
        if (err) return res.json(err);
        if (data.length == 0)
          return res.json(
            "Team " + values[1] + " not present. Add team first."
          );
        const match_present =
          "SELECT * FROM matches WHERE `year` = ? AND `team1` = ? AND `team2` = ? AND `stage` = ?";
        db.query(
          match_present,
          [values[5], values[0], values[1], values[4]],
          (err, data) => {
            if (err) return res.json(err);
            if (data.length > 0)
              return res.json("Duplicate match. Delete match first.");
            const q =
              "INSERT INTO matches (`team1`, `team2`, `score1`, `score2`, `stage`, `year`) VALUES (?)";
            db.query(q, [values], (err, data) => {
              if (err) return res.json(err);
              return res.json("Match has been Added");
            });
          }
        );
      });
    });
  });
});

app.delete("/add/matches/delete/:team1/:team2/:stage/:year", (req, res) => {
  if (req.params.team1 == req.params.team2) {
    return res.json("same team on both side");
  }
  const values = [
    req.params.team1 < req.params.team2 ? req.params.team1 : req.params.team2,
    req.params.team1 < req.params.team2 ? req.params.team2 : req.params.team1,
    req.params.stage,
    parseInt(req.params.year),
  ];
  const check_tournament = "SELECT * FROM tournament WHERE `year` = ?";
  db.query(check_tournament, values[3], (err, data) => {
    if (err) return res.json(err);
    if (data.length == 0)
      return res.json(
        "No tournament in year: " + values[3] + ". Add Tournament First"
      );
    const team_present = "SELECT * FROM team WHERE `year` = ? AND `name` = ?";
    db.query(team_present, [values[3], values[0]], (err, data) => {
      if (err) return res.json(err);
      if (data.length == 0)
        return res.json("Team " + values[0] + " not present. Add team first.");
      db.query(team_present, [values[3], values[1]], (err, data) => {
        if (err) return res.json(err);
        if (data.length == 0)
          return res.json(
            "Team " + values[1] + " not present. Add team first."
          );
        const match_present =
          "SELECT * FROM matches WHERE `year` = ? AND `team1` = ? AND `team2` = ? AND `stage` = ?";
        db.query(
          match_present,
          [values[3], values[0], values[1], values[2]],
          (err, data) => {
            if (err) return res.json(err);
            if (data.length == 0)
              return res.json("No such match. Add match first.");
            const q =
              "DELETE FROM matches WHERE `year` = ? AND `team1` = ? AND `team2` = ? AND `stage` = ?";
            db.query(
              q,
              [values[3], values[0], values[1], values[2]],
              (err, data) => {
                if (err) return res.json(err);
                return res.json("Match has been Deleted");
              }
            );
          }
        );
      });
    });
  });
});
/*
const q = "DELETE FROM tournament WHERE `year` = ?";
    db.query(q, [year], (err, data) => {
      if (err) return res.json(err);
      return res.json("Tournamnet has been deleted");
    });
*/

app.post("/add/tournament/add", (req, res) => {
  const values = [req.body.year, req.body.winner, req.body.host];
  const check_tournament = "SELECT * FROM tournament WHERE `year` = ?";
  db.query(check_tournament, values[0], (err, data) => {
    if (err) return res.json(err);
    if (data.length > 0)
      return res.json(
        "Duplicate tournament in year: " +
          values[0] +
          ". Delete Tournament First"
      );
    const q = "INSERT INTO tournament (`year`, `winner`, `host`) VALUES (?)";
    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.json("Tournament has been Added");
    });
  });
});

app.delete("/add/tournament/delete/:year", (req, res) => {
  const year = parseInt(req.params.year);
  const check_tournament = "SELECT * FROM tournament WHERE `year` = ?";
  db.query(check_tournament, [year], (err, data) => {
    if (err) return res.json(err);
    if (data.length == 0)
      return res.json(
        "No tournament in year: " + year + ". Add Tournament First"
      );
    const q = "DELETE FROM tournament WHERE `year` = ?";
    db.query(q, [year], (err, data) => {
      if (err) return res.json(err);
      const delete_teams = "DELETE FROM team WHERE `year` = ?";
      db.query(delete_teams, [year], (err, data) => {
        if (err) return res.json(err);
        const delete_matches = "DELETE FROM matches WHERE `year` = ?";
        db.query(delete_matches, [year], (err, data) => {
          if (err) return res.json(err);
          return res.json("Tournamnet has been deleted");
        });
      });
    });
  });
});

app.post("/add/team/add", (req, res) => {
  const values = [req.body.name, req.body.year];
  const check_tournament = "SELECT * FROM tournament WHERE `year` = ?";
  db.query(check_tournament, values[1], (err, data) => {
    if (err) return res.json(err);
    if (data.length == 0)
      return res.json(
        "No tournament in year: " + values[1] + ". Add Tournament First"
      );
    const check_duplicate_team =
      "SELECT * FROM team WHERE `name` = ? and `year` = ?";
    db.query(check_duplicate_team, values, (err, data) => {
      if (err) return res.json(err);
      if (data.length > 0)
        return res.json("Duplicate Team in year: " + values[1]);
      const q = "INSERT INTO team (`name`, `year`) VALUES (?)";
      db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Team has been Added");
      });
    });
  });
});

app.delete("/add/team/delete/:name/:year", (req, res) => {
  const name = req.params.name;
  const year = parseInt(req.params.year);
  const values = [name, year];
  const check_tournament = "SELECT * FROM tournament WHERE `year` = ?";
  db.query(check_tournament, year, (err, data) => {
    if (err) return res.json(err);
    if (data.length == 0)
      return res.json(
        "No tournament in year: " + year + ". Add Tournament First"
      );
    const check_has_team = "SELECT * FROM team WHERE `name` = ? and `year` = ?";
    db.query(check_has_team, values, (err, data) => {
      if (err) return res.json(err);
      if (data.length == 0)
        return res.json("No Team " + name + " in year: " + year);
      const q = "DELETE FROM team WHERE `name` = ? AND `year` = ?";
      db.query(q, [name, year], (err, data) => {
        if (err) return res.json(err);
        const delete_matches =
          "DELETE FROM matches WHERE `year` = ? AND (`team1` = ? OR `team2` = ?)";
        db.query(delete_matches, [year, name, name], (err, data) => {
          if (err) return res.json(err);
          return res.json("Team has been deleted");
        });
      });
    });
  });
});

app.get("/", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/get/tournament", (req, res) => {
  const q = "SELECT * FROM tournament";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/get/matches/:year", (req, res) => {
  const y = req.params.year;
  const q = "SELECT * FROM matches WHERE year = ?";
  db.query(q, [y], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/get/team/:year", (req, res) => {
  const y = req.params.year;
  const q = "SELECT * FROM team WHERE year = ?";
  db.query(q, [y], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/", (req, res) => {
  const q = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been created");
  });
});

app.delete("/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";
  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been deleted");
  });
});

app.put("/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];
  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been updated");
  });
});

app.listen(8800, () => {
  console.log("Connected to backend!");
});
