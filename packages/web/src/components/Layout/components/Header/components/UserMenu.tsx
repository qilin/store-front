import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, MenuItem, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { User as UserType } from 'types';

const useStyles = makeStyles({
  userName: {
    color: 'white',
  },
});

interface Props {
  user: UserType;
  onLogout: () => void;
}

const UserMenu = (props: Props) => {
  const { user, onLogout } = props;
  const { t } = useTranslation();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const getDisplayName = () => {
    const { lastname, firstname } = user.profile;

    return [firstname, lastname]
      .filter(Boolean)
      .join(' ') || 'Anonymous';
  };

  const handleOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    onLogout();
  };

  return (
    <div>
      <Button
        onMouseEnter={handleOpen}
        onClick={handleOpen}
      >
        <span className={classes.userName}>
          {getDisplayName()}
        </span>
      </Button>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        keepMounted
      >
        <MenuItem onMouseLeave={handleClose} onClick={handleLogout}>
          {t('labels.logout')}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
