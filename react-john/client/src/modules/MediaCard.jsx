import * as React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardImg from '../images/player.jpg';

export default function MediaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={CardImg}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         Tournament Here
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Teams and Winner here
        </Typography>
      </CardContent>
      <CardActions>
        <Container>
            <Button variant="contained" size="medium" sx={{m: 1}}>Teams</Button>
            <Button variant="contained" size="medium" sx={{m: 1}}>Matches</Button>
        </Container>
      </CardActions>
    </Card>
  );
}