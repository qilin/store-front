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
  const { id, media, title, summary, tags } = game;
  const genre = tags[0].title;
  const classes = useStyles();

  return (
    <Card key={id} className={classes.card}>
      <CardMedia
        className={classes.cover}
        image={media.screenshots[0]}
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
          {tags.map(({ id, title }) => (
            <Link
              key={id}
              to={id}
              className={classes.link}
            >
              {title}
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
