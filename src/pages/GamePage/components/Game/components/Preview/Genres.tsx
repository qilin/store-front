import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { WithTitleAndId } from 'types';
import { Chip } from '@material-ui/core';

const useStyles = makeStyles({
  genre: {
    borderColor: '#fff',
    color: '#fff',
    textTransform: 'uppercase',
    marginRight: '8px',
  },
});

interface Props {
  genres: WithTitleAndId[];
}

const Genres = (props: Props) => {
  const { genres } = props;
  const classes = useStyles();
  return (
    <div>
      {genres.map(({ id, title }) => (
        <Chip className={classes.genre} key={id} label={title} variant="outlined" />
      ))}
    </div>
  );
};

export default Genres;
