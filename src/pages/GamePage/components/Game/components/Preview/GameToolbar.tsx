import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { CordGame } from 'types';

import Rating from './Rating';
import Genres from './Genres';
import Realease from './Realese';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    minHeight: '120px',
    background: 'rgba(38,38,38,0.6)',
    padding: '35px 45px',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    display: 'flex',
    color: '#fff',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
  },
  back: {
    outline: 0,
    display: 'inline-flex',
    boxShadow: 'none',
    color: 'rgba(255,255,255,0.75)',
    textTransform: 'capitalize',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  link: {
    color: 'rgba(255,255,255,0.75)',
  },
  title: {
    fontSize: '21px',
    marginFight: '24px',
    flexDirection: 'column',
    display: 'flex',
    flexWrap: 'wrap',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    padding: '0 12px',
  },
});

interface Props {
  game: CordGame;
}

const GameToolbar = (props: Props) => {
  const { game } = props;
  const { title, genres, releaseDate, developer, publisher, rating } = game;
  const classes = useStyles();
  const publisherDeveloperTitle = (publisher.title === developer.title)
    ? publisher.title
    : `${publisher.title} / ${developer.title}`;

  return (
    <Toolbar className={classes.root}>
      <div className={classes.left}>
        <Link className={classes.link} to="/shop">
          <Button className={classes.back}>
            Назад
          </Button>
        </Link>
        <div className={classes.title}>
          {title}
          <Rating rating={rating} />
        </div>
        <Genres genres={genres} />
      </div>
      <Realease title={publisherDeveloperTitle} realeaseDate={releaseDate} />
    </Toolbar>
  );
};

export default GameToolbar;
