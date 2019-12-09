import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { Check as CheckIcon } from '@material-ui/icons';
import colors from 'styles/colors';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'transparent',
  },
  cell: {
    fill: 'white',
  },
  head: {
    color: colors.TITLE_GREY,
  },
});

interface Props {
  languages: {
    audio: string[];
    text: string[];
  };
}

const Languages = (props: Props) => {
  const { languages } = props;
  const { audio, text } = languages;
  const classes = useStyles();
  const allLaguages = Array.from(new Set([...audio, ...text]));

  return (
    <Table className={classes.root}>
      <TableHead>
        <TableRow>
          {['Language', 'Text', 'Audio'].map(tHead => (
            <TableCell key={tHead} className={classes.head}>{tHead}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {allLaguages.map(lang => (
          <TableRow key={lang}>
            <TableCell className={classes.head}>{lang}</TableCell>
            <TableCell>{text.includes(lang) ? <CheckIcon className={classes.cell} /> : null}</TableCell>
            <TableCell>{audio.includes(lang) ? <CheckIcon className={classes.cell} /> : null}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Languages;
