import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { StarRate as StarRateIcon } from '@material-ui/icons';
const useStyles = makeStyles({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    verticalAlign: 'middle',
  },
  empty: {
    opacity: '0.4',
  },
});

interface Props {
  rating: number;
}

const Rating = (props: Props) => {
  const { rating } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {new Array(5).fill(0).map((_, index) => (
        <StarRateIcon key={index} className={rating - index >= 1 ? undefined : classes.empty} />
      ))}
    </div>
  );
};

export default Rating;
