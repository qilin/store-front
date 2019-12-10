import React from 'react';

import useStyles from './useStyle';
import { LoginButton } from './components';

const Header = () => {
  const classes = useStyles();

  return (
    <header className={classes.root}>
      <div className={classes.logoContainer}>
        <span className={classes.logoText}>Рамблер/ ИГРЫ</span>
      </div>
      <LoginButton />
    </header>
  );
};

export default Header;
