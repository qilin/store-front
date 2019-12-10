import React from 'react';
import { Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles({
  linkContainer: {
    margin: '5px 10px 20px',
    color: 'white',
  },
});

const links = ['Super.com', 'Vacancies', 'Company', 'Terms & Conditions', 'Legal Agreement'];

const LinkList = () => {
  const classes = useStyle();

  return (
    <>
      {links.map((linkTitle: string) => (
        <div className={classes.linkContainer} key={linkTitle}>
          <Link color="inherit" href="#">{linkTitle}</Link>
        </div>
      ))}
    </>
  );
};

export default LinkList;
