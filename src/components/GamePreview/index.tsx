import React from 'react';
import { CordGame } from 'types';

import { GameToolbar, BackgroundImage } from './components';
import useStyles from './useStyles';

interface Props {
  game: CordGame;
}

const GamePreview = (props: Props) => {
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

export default GamePreview;
