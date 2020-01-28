import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import getPlatformIcons from '@qilin/shared/src/helpers/getPlatformIcons';
import { Platform, Maybe } from '@qilin/shared/src/generated/types';

const useStyles = makeStyles({
  iconWrapper: {
    padding: '16px',
    marginRight: '8px',
    fontSize: '1.718em',
    fill: 'white',
    color: 'white',
  },
});

interface Props {
  platforms: Maybe<Platform>[];
  wrapperClass?: string;
}

const PlatformIcons = (props: Props) => {
  const classes = useStyles();
  const { platforms, wrapperClass = classes.iconWrapper } = props;

  const platformIcons = getPlatformIcons(platforms);

  return (
    <Box display="flex">
      {platformIcons.map((Icon, index) => (
        <div key={index} className={wrapperClass}>
          <Icon />
        </div>
      ))}
    </Box>
  );
};

export default PlatformIcons;
