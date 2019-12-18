import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GamePreview, GameInfo } from 'components';
import { DesktopGame as Game } from 'generated/types';

import { Media, Requirements } from './components';

const useStyles = makeStyles({
  root: {
    minHeight: '592px',
    position: 'relative',
  },
});

interface Props {
  game: Game;
}

const DesktopGame = (props: Props) => {
  const { game } = props;
  const { platforms, price, media, requirements, languages } = game;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GamePreview game={game} />
      <GameInfo platforms={platforms} price={price || 0} />
      <Media {...media} />
      {requirements && <Requirements platforms={platforms} requirements={requirements} languages={languages} />}
    </div>
  );
};

export default DesktopGame;
