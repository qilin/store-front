import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, CardMedia, CardContent, Card } from '@material-ui/core';
import { Game } from 'types';

import useStyles from './useStyles';

interface Props {
  game: Game;
}

const FeaturedCard = (props: Props) => {
  const { game } = props;
  const { id, screenshots, title, summary, tags } = game;
  const genre = tags[0].name;
  const classes = useStyles();

  return (
    <Card key={id} className={classes.card}>
      <CardMedia
        className={classes.cover}
        image={screenshots[0].url}
        title={title}
      />
      <CardContent className={classes.content}>
        <Typography component="h3" variant="h3">
          {title}
        </Typography>
        <Typography className={classes.genre} variant="subtitle1">
          {genre}
        </Typography>
        <Typography className={classes.summary} variant="caption">
          {summary}
        </Typography>
        <div className={classes.tags}>
          {tags.map(({ id, name, slug }) => (
            <Link
              key={id}
              to={slug}
              className={classes.link}
            >
              {name}
            </Link>
          ))}
        </div>
        <Button className={classes.button}>Играть бесплатно</Button>
      </CardContent>
      <div className={`${classes.cover} ${classes.overlay}`}></div>
    </Card>
  );
};

export default FeaturedCard;
