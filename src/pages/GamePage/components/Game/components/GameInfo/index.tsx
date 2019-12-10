import React from 'react';
import { Toolbar, Button } from '@material-ui/core';
import { HeartIcon } from 'assets/icons';

import useStyles from './useStyles';
import PlatformIcons from 'components/PlatformIcons';

interface Props {
  platforms: string[];
  price: number;
}

const GameInfo = (props: Props) => {
  const { platforms, price } = props;
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
      </div>
    </Toolbar >
  );
};

export default GameInfo;
