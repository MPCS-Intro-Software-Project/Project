import * as React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardImg from '../images/player.jpg';
import { Link } from "react-router-dom";

export default function MediaCard({content}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={CardImg}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {content.host} {content.year}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Winner: {content.winner}
        </Typography>
      </CardContent>
      <CardActions>
        <Container>
          <Link to={`/get/team/${content.year}`}>
            <Button variant="contained" size="medium" sx={{m: 1}}>Teams</Button>
          </Link>
          <Link to={`/get/matches/${content.year}`}>
            <Button variant="contained" size="medium" sx={{m: 1}}>Matches</Button>
          </Link>
        </Container>
      </CardActions>
    </Card>
  );
}