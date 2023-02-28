import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardImg from "../images/player.jpg";
import { Link } from "react-router-dom";

export default function MatchCard({ content }) {
  return (
    <Card>
      <CardContent
        sx={{ flexGrow: 1, width: "auto", margin: "auto" }}
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography gutterBottom variant="h6" component="div">
          <b>{content.team1}</b> {content.score1} | {content.score2}{" "}
          <b>{content.team2}</b>
          <p>date: {content.date}</p>
          <p>
            start time: {content.hour}:{content.minute}
          </p>
          <p>city: {content.city}</p>
          <p>temperature: {content.temperature}F</p>
          <p>tickets sold: {content.tickets}</p>
        </Typography>
        <Typography gutterBottom variant="h5" component="div"></Typography>
      </CardContent>
    </Card>
  );
}
