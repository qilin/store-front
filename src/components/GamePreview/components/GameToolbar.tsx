import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Rating } from 'components';
import { Game } from 'types';
import { LINKS } from 'styles/colors';

import { Release, Genres } from './index';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap',
    width: '100%',
    minHeight: '120px',
    padding: '35px 45px',
    background: 'rgba(38,38,38,0.6)',
    color: 'white',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
  },
  back: {
    display: 'inline-flex',
    color: LINKS,
    boxShadow: 'none',
    outline: 0,
    textTransform: 'capitalize',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  link: {
    color: LINKS,
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginRight: '24px',
    padding: '0 12px',
    fontSize: '21px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
});

interface Props {
  game: Game;
}

const GameToolbar = (props: Props) => {
  const { game } = props;
  const { title, genres, releaseDate, developer, publisher, rating } = game;
  const { t } = useTranslation();
  const classes = useStyles();
  const publisherDeveloperTitle = (publisher.title === developer.title)
    ? publisher.title
    : `${publisher.title} / ${developer.title}`;

  return (
    <Toolbar className={classes.root}>
      <div className={classes.left}>
        <Link className={classes.link} to="/shop">
          <Button className={classes.back}>
            {t('labels.back')}
          </Button>
        </Link>
        <div className={classes.title}>
          {title}
          <Rating rating={rating} />
        </div>
        <Genres genres={genres} />
      </div>
      <Release title={publisherDeveloperTitle} realeaseDate={releaseDate} />
    </Toolbar>
  );
};

export default GameToolbar;
