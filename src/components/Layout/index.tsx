import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
});

const Layout = (props: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <main>
        {props.children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
