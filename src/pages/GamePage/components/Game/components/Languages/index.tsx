import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { Check as CheckIcon } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

import useStyles from './useStyles';

interface Props {
  languages: {
    audio: string[];
    text: string[];
  };
}

const Languages = (props: Props) => {
  const { languages } = props;
  const { audio, text } = languages;
  const { t } = useTranslation();
  const classes = useStyles();
  const allLaguages = Array.from(new Set([...audio, ...text]));

  return (
    <Table className={classes.root}>
      <TableHead>
        <TableRow>
          {['language', 'text', 'audio'].map(tHead => (
            <TableCell key={tHead} className={classes.head}>{t(`labels.${tHead}`)}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {allLaguages.map(lang => (
          <TableRow key={lang}>
            <TableCell className={classes.cell}>{t(`locales.${lang}`)}</TableCell>
            <TableCell>{text.includes(lang) ? <CheckIcon className={classes.cell} /> : null}</TableCell>
            <TableCell>{audio.includes(lang) ? <CheckIcon className={classes.cell} /> : null}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Languages;
