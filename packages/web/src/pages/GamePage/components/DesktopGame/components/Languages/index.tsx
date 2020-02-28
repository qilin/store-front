import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { Check as CheckIcon } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { Maybe, Languages as LanguagesType } from 'generated/types';

import useStyles from './useStyles';

interface Props {
  languages?: Maybe<LanguagesType>;
}

const Languages = (props: Props) => {
  const { languages } = props;
  const { t } = useTranslation();
  const classes = useStyles();

  if (!languages) return null;

  const { audio, text } = languages;
  const allLanguages = Array.from(new Set([...audio, ...text]));

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
        {allLanguages.map(lang => (
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
