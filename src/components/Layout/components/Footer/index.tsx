import React from 'react';
import { Grid } from '@material-ui/core';

import { LinkList, LogoYear, SocialDescription } from './components';
import useStyles from './useStyle';

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={2}>
          <LogoYear />
        </Grid>
        <Grid item xs={12} sm={4}>
          <LinkList />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SocialDescription />
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
