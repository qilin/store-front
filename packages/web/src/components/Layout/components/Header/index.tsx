import React from 'react';

import { UserButton, LocaleSwitcher, ChannelSwitcher } from './components';
import useStyles from './useStyle';
import { isLauncher } from '../../../../helpers';

const Header = () => {
  const classes = useStyles();

  return (
    <header className={classes.root}>
      <div className={classes.logoContainer}>
        <span className={classes.logoText}>Рамблер/ ИГРЫ</span>
      </div>
      {isLauncher && <ChannelSwitcher />}
      <UserButton />
      <LocaleSwitcher />
    </header>
  );
};

export default Header;
