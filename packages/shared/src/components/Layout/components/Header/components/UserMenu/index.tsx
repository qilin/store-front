import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, CircularProgress } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { BLACK } from '@qilin/shared/src/styles/colors';
import { UserContext } from '@qilin/shared/src/App';

import User from '../User';

const useStyles = makeStyles({
  root: {
    marginLeft: 'auto',
  },
  button: {
    marginLeft: 15,
    backgroundColor: BLACK,
    color: 'white',
  },
  userName: {
    color: 'white',
  },
});

const UserMenu = () => {
  const { user = null, loading = false, onLogin, onLogout } = useContext(UserContext);
  const { t } = useTranslation();
  const classes = useStyles();

  const getContent = () => {
    if (loading) return <CircularProgress color="inherit" />;

    if (!user) return (
      <Button className={classes.button} onClick={onLogin} size="small">
        {t('labels.login')}
      </Button>
    );

    return <User user={user} onLogout={onLogout} />;
  };

  return (
    <div className={classes.root}>
      {getContent()}
    </div>
  );
};

export default UserMenu;
