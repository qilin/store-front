import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Preview from './components/Preview';
import cordGameMock from 'pages/GamePage/cordGameMock';
import GameInfo from './components/GameInfo';
import { CordGame } from 'types';

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
  const { game = cordGameMock } = props;
  const { platforms, price } = game;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Preview game={game} />
      <GameInfo platforms={platforms} price={price} />
    </div>
  );
};

export default Game;
