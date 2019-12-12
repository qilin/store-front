import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CordGame } from 'types';
import { mockGame } from 'mocks';

import { Preview, GameInfo, Media, Requirements } from './components';

const useStyles = makeStyles({
  root: {
    minHeight: '592px',
    position: 'relative',
  },
});

interface Props {
  game?: CordGame;
}

const Game = (props: Props) => {
  const { game = mockGame } = props;
  const { platforms, price, media, requirements } = game;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Preview game={game} />
      <GameInfo platforms={platforms} price={price} />
      <Media {...media} />
      <Requirements platforms={platforms} {...requirements} />
    </div>
  );
};

export default Game;
