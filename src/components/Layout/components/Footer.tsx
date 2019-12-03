import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container>
        <Typography variant="body1">Qilin Store.</Typography>
        <Typography variant="body2" color="textSecondary">
          {'© '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
