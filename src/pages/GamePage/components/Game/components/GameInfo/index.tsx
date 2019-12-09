import React from 'react';
import { Toolbar, Button } from '@material-ui/core';
import { WindowsIcon, AppleIcon, LinuxIcon, HeartIcon } from 'assets/icons';

import useStyles from './useStyles';

interface Props {
  platforms: string[];
  price: number;
}

const getPlatformIcons = (platforms: string[]) => {
  return platforms.map(platform => {
    switch (platform) {
      case 'windows':
        return <WindowsIcon />;
      case 'mac_os':
        return <AppleIcon />;
      case 'linux':
        return <LinuxIcon />;
      default:
        return null;
    }
  });
};

const GameInfo = (props: Props) => {
  const { platforms, price } = props;
  const classes = useStyles();
  const platformIcons = getPlatformIcons(platforms);

  return (
    <Toolbar className={classes.root}>
      <div className={classes.flex}>
        {platformIcons.map((icon, index) => (
          <div key={index} className={classes.iconWrapper}>
            {icon}
          </div>
        ))}
      </div>
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
