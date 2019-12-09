import React from 'react';
import { Typography, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import { Requirements } from 'types';
import { megabytesToSize } from 'helpers';

import useStyles from './useStyles';

interface Props {
  title: string;
  requirements: Requirements;
}

const System = (props: Props) => {
  const { title, requirements } = props;
  const renderedRequirements = {
    ...requirements,
    diskSpace: megabytesToSize(parseInt(requirements.diskSpace)),
    ram: megabytesToSize(parseInt(requirements.ram)),
  };
  const rows = Object.entries(renderedRequirements);
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
