import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { WindowsIcon, AppleIcon, LinuxIcon } from 'assets/icons';
import { Box } from '@material-ui/core';

const useStyles = makeStyles({
  iconWrapper: {
    padding: '16px',
    marginRight: '8px',
    fontSize: '1.718em',
    fill: 'white',
    color: 'white',
  },
});

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

interface Props {
  platforms: string[];
  wrapperClass?: string;
}

const PlatformIcons = (props: Props) => {
  const classes = useStyles();
  const { platforms, wrapperClass = classes.iconWrapper } = props;
  const platformIcons = getPlatformIcons(platforms);

  return (
    <Box display="flex">
      {platformIcons.map((icon, index) => (
        <div key={index} className={wrapperClass}>
          {icon}
        </div>
      ))}
    </Box>
  );
};

export default PlatformIcons;
