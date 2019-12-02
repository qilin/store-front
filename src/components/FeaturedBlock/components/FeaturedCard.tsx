import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Button, Typography, CardMedia, CardContent, Card } from '@material-ui/core';
import { Game } from 'types';

const useStyles = makeStyles({
  card: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end',
    minHeight: '100%',
    cursor: 'pointer',
    padding: '2rem',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  content: {
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    zIndex: 2,
    color: 'white',
  },
  tags: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  cover: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  link: {
    color: '#8d96b2',
    fontSize: '8px',
    textDecoration: 'none',
    display: 'inline-block',
    margin: '4px 4px 0 0',
    padding: '0 8px',
    border: '1px solid rgba(199,205,225,0.4)',
    borderRadius: '14.5px',
    cursor: 'pointer',
    transition: 'color 200ms, border 200ms',
    '&:hover': {
      color: 'white',
      border: '1px solid white',
    },
  },
  button: {
    color: '#fff',
    fontSize: '12px',
    marginTop: '20px',
    backgroundColor: '#28bc00',
    '&:hover': {
      backgroundColor: '#24a900',
    },
    transition: 'background-color 200ms',
  },
  genre: {
    margin: '20px 0',
  },
  summary: {
    textAlign: 'left',
    paddingBottom: '16px',
  },
});

interface Props {
  game: Game;
}

export default function FeaturedCard(props: Props) {
  const { game: { id, screenshots, title, summary, tags } } = props;
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
}
