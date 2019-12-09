import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import { Requirements } from 'types';
import colors from 'styles/colors';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'transparent',
    color: 'white',
  },
  table: {
    color: 'white',
  },
  cell: {
    color: 'white',
  },
  head: {
    color: colors.TITLE_GREY,
    textTransform: 'uppercase',
  },
});

interface Props {
  title: string;
  requirements: Requirements;
}

const System = (props: Props) => {
  const { title, requirements } = props;
  const rows = Object.entries(requirements);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4">
        {title}
      </Typography>
      <Table>
        <TableBody>
          {rows.map(([key, value]) => (
            <TableRow key={value}>
              <TableCell className={`${classes.cell} ${classes.head}`}>{key}</TableCell>
              <TableCell className={classes.cell} align="left">{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div >
  );
};

export default System;
