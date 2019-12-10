import React from 'react';
import { Select, MenuItem, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyle = makeStyles({
  root: {
    marginLeft: 15,
    color: 'white',
  },
});

export const languages = [
  {
    title: 'English',
    value: 'enUS',
  },
  {
    title: 'Русский',
    value: 'ruRU',
  },
];

const LocaleSwitcher = () => {
  const { i18n } = useTranslation();
  const classes = useStyle();

  const handleChangeLocale = (event: any) => i18n.changeLanguage(event.target.value);

  return (
    <Select className={classes.root} value={i18n.language} onChange={handleChangeLocale}>
      {languages.map(({ title, value }) => (
        <MenuItem key={value} value={value}>{title}</MenuItem>
      ))}
    </Select>
  );
};

export default LocaleSwitcher;
