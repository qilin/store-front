import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Chip } from '@material-ui/core';
import { WithTitleAndId } from 'types';

const useStyles = makeStyles({
  genre: {
    borderColor: 'white',
    color: 'white',
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
