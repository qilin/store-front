import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Chip } from '@material-ui/core';
import { Genre } from 'types';

const useStyles = makeStyles({
  genre: {
    borderColor: 'white',
    color: 'white',
    textTransform: 'uppercase',
    marginRight: '8px',
  },
});

interface Props {
  genres: Genre[];
}

const Genres = (props: Props) => {
  const { genres } = props;
  const classes = useStyles();

  return (
    <div>
      {genres.map(genre => (
        <Chip
          key={genre}
          className={classes.genre}
          label={genre}
          variant="outlined"
        />
      ))}
    </div>
  );
};

export default Genres;
