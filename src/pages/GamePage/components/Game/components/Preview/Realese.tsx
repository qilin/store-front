import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    fontSize: '16px',
  },
  divider: {
    width: '1px',
    backgroundColor: '#fff',
    margin: '0 8px',
  },
});

interface Props {
  title: string;
  realeaseDate: string;
}

const Realease = (props: Props) => {
  const { title, realeaseDate } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {realeaseDate}
      <div className={classes.divider} />
      {title}
    </div>
  );
};

export default Realease;
