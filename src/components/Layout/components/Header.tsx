import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ramblerAuth } from 'helpers';
import { User } from 'types';

const useStyles = makeStyles(() => ({
  toolbarTitle: {
    flex: 1,
  },
}));

const Header = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const onInit = (user: User) => {
    setUser(user);
    setLoading(false);
  };

  const onLogout = () => {
    ramblerAuth.logout();
    setUser(null);
  };

  const onLogin = () => {
    ramblerAuth.openAuth();
  };

  useEffect(() => {
    ramblerAuth.init(onInit);
  }, []);

  return (
    <AppBar position="relative" color="default">
      <Toolbar>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          Rambler/Игры
        </Typography>
        {loading && <div>loading...</div>}
        {!loading && user && (
          <div>
            {user.display.display_name}
            {' '}
            <Button onClick={onLogout} variant="outlined" size="small">Выход</Button>
          </div>
        )}
        {!loading && !user && (
          <Button onClick={onLogin} variant="outlined" size="small">
            Войти
        </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
