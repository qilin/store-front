import React, { useContext } from 'react';

import { UserButton, LocaleSwitcher, ChannelSwitcher } from './components';
import useStyles from './useStyle';
import { LauncherContext } from '../../../../App';

const Header = () => {
  const classes = useStyles();
  const isLauncher = useContext(LauncherContext);

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
