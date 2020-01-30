import React from 'react';

import { UserButton, LocaleSwitcher } from './components';
import useStyles from './useStyle';

const Header = () => {
  const classes = useStyles();

  return (
    <header className={classes.root}>
      <div className={classes.logoContainer}>
        <span className={classes.logoText}>Рамблер/ ИГРЫ</span>
      </div>
      <UserButton />
      <LocaleSwitcher />
    </header>
  );
};

export default Header;
