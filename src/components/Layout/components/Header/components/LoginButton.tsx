import React, { useState, useEffect } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { ramblerAuth } from 'helpers';
import { User } from 'types';
import { makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';

const useStyle = makeStyles({
  root: {
    marginLeft: 'auto',
  },
  button: {
    marginLeft: 15,
    backgroundColor: '#121212',
    color: 'white',
  },
  userName: {
    color: 'white',
  },
});

const LoginButton = () => {
  const classes = useStyle();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const { t } = useTranslation();

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
    <div className={classes.root}>
      {loading && <CircularProgress color="inherit" />}
      {!loading && user && (
        <div>
          <span className={classes.userName}>
            {user.display.display_name}
          </span>
          <Button className={classes.button} onClick={onLogout} size="small">{t('labels.logout')}</Button>
        </div>
      )}
      {!loading && !user && (
        <Button className={classes.button} onClick={onLogin} size="small">
          {t('labels.login')}
        </Button>
      )}
    </div>
  );
};

export default LoginButton;
