import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CordGame } from 'types';

import GameToolbar from './GameToolbar';
import BackgroundImage from './BackgroundImage';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    minHeight: 'calc(100vw / 2)',
    maxHeight: '650px',
  },
});

interface Props {
  game: CordGame;
}

const Preview = (props: Props) => {
  const { game } = props;
  const { screenshots } = game.media;
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <GameToolbar game={game} />
      <BackgroundImage src={screenshots[0]} />
    </section>
  );
};

export default Preview;
