import React from 'react';
import { Toolbar, Button } from '@material-ui/core';
import { PlatformIcons } from 'components';
import { HeartIcon } from 'assets/icons';

import useStyles from './useStyles';

interface Props {
  platforms: string[];
  price: number;
  onPlay?: () => void;
}

const GameInfo = (props: Props) => {
  const { platforms, onPlay, price } = props;
  const classes = useStyles();

  return (
    <Toolbar className={classes.root}>
      <PlatformIcons platforms={platforms} />
      <div className={classes.flex}>
        <Button className={`${classes.iconWrapper} ${classes.dark}`}>
          <HeartIcon />
        </Button>
        <Button className={`${classes.iconWrapper} ${classes.dark}`}>
          $ {price}
        </Button>
        <Button onClick={onPlay}>Играть бесплатно</Button>
      </div>
    </Toolbar >
  );
};

export default GameInfo;
