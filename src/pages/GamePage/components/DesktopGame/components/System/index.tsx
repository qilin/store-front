import React from 'react';
import { Typography, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import { RequirementsSet } from 'generated/types';
import { megabytesToSize } from 'helpers';

import useStyles from './useStyles';

interface Props {
  title: string;
  requirements: RequirementsSet;
}

const System = (props: Props) => {
  const { title, requirements } = props;
  const renderedRequirements = {
    ...requirements,
    diskSpace: requirements.diskSpace ? megabytesToSize(parseInt(requirements.diskSpace)) : '',
    ram: requirements.ram ? megabytesToSize(parseInt(requirements.ram)) : '',
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
            <TableRow key={key}>
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
