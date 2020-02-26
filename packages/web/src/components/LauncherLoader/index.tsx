import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BACKGROUND_DARK } from 'styles/colors';
import { CircularProgress } from '@material-ui/core';

const useStyle = makeStyles({
  loaderWrapper: {
    backgroundColor: BACKGROUND_DARK,
    height: '100vh',
    color: 'white',
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    color: 'white',
  },
});

const LauncherLoader = () => {
  const classes = useStyle();

  return (
    <div className={classes.loaderWrapper}>
      <CircularProgress className={classes.loader} />
    </div>
  );
};

export default LauncherLoader;
