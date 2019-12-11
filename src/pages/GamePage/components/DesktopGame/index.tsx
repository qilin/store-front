import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CordGame } from 'types';
import { mockGame } from 'mocks';

import { Preview, GameInfo, Media, Requirements } from './components';
import { GamePreview, GameInfo } from 'components';

import { Media, Requirements } from './components';

const useStyles = makeStyles({
  root: {
    minHeight: '592px',
    position: 'relative',
  },
});

interface Props {
  game?: CordGame;
}

const DesktopGame = (props: Props) => {
  const { game = mockGame } = props;
  const { platforms, price, media, requirements } = game;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GamePreview game={game} />
      <GameInfo platforms={platforms} price={price} />
      <Media {...media} />
      <Requirements platforms={platforms} {...requirements} />
    </div>
  );
};

export default DesktopGame;
