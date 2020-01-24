import React from 'react';
import { Game } from '@qilin/shared/src/types';

import { GameToolbar, BackgroundImage } from './components';
import useStyles from './useStyles';

interface Props {
  game: Game;
}

const GamePreview = (props: Props) => {
  const { game } = props;
  const { screenshots } = game.media;
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <GameToolbar game={game} />
      <BackgroundImage src={screenshots[0].url} />
    </section>
  );
};

export default GamePreview;
