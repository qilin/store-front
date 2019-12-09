import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  wrapper: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  image: {
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
  },
});

interface Props {
  src: string;
}

const BackgroundImage = (props: Props) => {
  const { src } = props;
  const classes = useStyles();

  return (
    <div className={`${classes.root} ${classes.absolute}`}>
      <div className={classes.wrapper}>
        <div className={`${classes.image} ${classes.absolute}`} style={{ backgroundImage: `url(${src})` }} />
      </div>
    </div>
  );
};

export default BackgroundImage;
