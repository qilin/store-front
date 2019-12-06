import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, Button } from '@material-ui/core';
import { WindowsIcon, AppleIcon, LinuxIcon, HeartIcon } from 'assets/icons';

const useStyles = makeStyles({
  root: {
    flexWrap: 'nowrap',
    display: 'flex',
    color: '#fff',
    backgroundColor: '#262626',
    padding: '35px 45px',
    justifyContent: 'space-between',
  },
  flex: {
    display: 'flex',
  },
  dark: {
    backgroundColor: '#121212',
  },
  iconWrapper: {
    padding: '16px',
    marginRight: '8px',
    fontSize: '1.718em',
    fill: '#fff',
    color: '#fff',
  },
  icon: {
    fontSize: '1.718em',
    color: '#fff',
  },
});

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
    }
  });
};

const GameInfo = (props: Props) => {
  const { platforms, price } = props;
  const classes = useStyles();
  const platformIcons = getPlatformIcons(platforms);
  console.log(platformIcons);
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
