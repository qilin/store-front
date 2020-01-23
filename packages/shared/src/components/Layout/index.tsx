import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BACKGROUND_LIGHT } from 'styles/colors';

import Footer from './components/Footer';
import Header from './components/Header';

interface Props {
  children: ReactNode;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    flexGrow: 1,
    backgroundColor: BACKGROUND_LIGHT,
  },
});

const Layout = (props: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <main className={classes.main}>
        {props.children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
