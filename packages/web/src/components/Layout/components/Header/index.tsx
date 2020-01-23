import React from 'react';

import { LoginButton, LocaleSwitcher } from './components';
import useStyles from './useStyle';

const Header = () => {
  const classes = useStyles();

  return (
    <header className={classes.root}>
      <div className={classes.logoContainer}>
        <span className={classes.logoText}>Рамблер/ ИГРЫ</span>
      </div>
      <LoginButton />
      <LocaleSwitcher />
    </header>
  );
};

export default Header;
