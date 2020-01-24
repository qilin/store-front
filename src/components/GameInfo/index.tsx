import React from 'react';
import { Toolbar, Button } from '@material-ui/core';
import { PlatformIcons } from '@qilin/shared/src/components';
import { HeartIcon } from '@qilin/shared/src/assets/icons';
import { Platform, Maybe } from 'generated/types';

import useStyles from './useStyles';

interface Props {
  platforms?: Maybe<Platform>[];
  price: number;
  onPlay?: () => void;
}

const GameInfo = (props: Props) => {
  const { platforms, onPlay, price } = props;
  const classes = useStyles();

  return (
    <Toolbar className={classes.root}>
      {platforms && <PlatformIcons platforms={platforms} />}
      <div className={classes.flex}>
        <Button className={`${classes.iconWrapper} ${classes.dark}`}>
          <HeartIcon />
        </Button>
        {price ? (
          <Button className={`${classes.iconWrapper} ${classes.dark}`}>
            $ {price}
          </Button>
        ) : (
            <Button className={`${classes.iconWrapper} ${classes.dark}`} onClick={onPlay}>Играть бесплатно</Button>
          )}
      </div>
    </Toolbar >
  );
};

export default GameInfo;
