import React, { SyntheticEvent } from 'react';
import { Snackbar } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import ContentWrapper from './components/ContentWrapper';

const useStyles = makeStyles((theme: Theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

interface Props {
  open: boolean;
  handleClose: () => void;
  message: string;
}

export default function ErrorMessage(props: Props) {
  const classes = useStyles();
  const { open, handleClose, message } = props;

  const onClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    handleClose();
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <ContentWrapper
        onClose={onClose}
        className={classes.margin}
        message={message}
      />
    </Snackbar>
  );
}
