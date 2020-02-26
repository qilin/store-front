import React from 'react';
import { Typography, Box } from '@material-ui/core';

interface Props {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: Props) => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
};

export default TabPanel;
