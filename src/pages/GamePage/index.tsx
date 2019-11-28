import React from 'react';
import { RouteComponentProps } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import queryString from 'query-string';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#203859',
  },
  button: {
    transition: 'background-color 200ms',
    color: '#fff',
    backgroundColor: '#28bc00',
    '&:hover': {
      backgroundColor: '#24a900',
    },
  },
});

const GamePage = (props: RouteComponentProps) => {
  const { uuid } = queryString.parse(props.location.search);
  console.log(uuid);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button className={classes.button}>Играть бесплатно</Button>
    </div>
  );
};

export default GamePage;
