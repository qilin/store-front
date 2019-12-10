import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles({
  logoContainer: {
    padding: 15,
    borderRadius: 4,
    display: 'inline-block',
    backgroundColor: 'rgba(8, 8, 8, 0.35)',
  },
  logoText: {
    color: 'white',
  },
  year: {
    marginTop: 60,
    color: 'rgba(255,255,255, 0.5)',
  },
});

const LogoContainer = () => {
  const classes = useStyle();

  return (
    <>
      <div className={classes.logoContainer}>
        <span className={classes.logoText}>Рамблер/ ИГРЫ</span>
      </div>
      <div className={classes.year}>{new Date().getFullYear()}</div>
    </>
  );
};

export default LogoContainer;
