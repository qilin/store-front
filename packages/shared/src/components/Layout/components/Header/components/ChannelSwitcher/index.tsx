import React, { useContext, useState } from 'react';
import { Select, MenuItem, makeStyles } from '@material-ui/core';
import { LauncherContext } from '@qilin/shared/src/App';

const useStyles = makeStyles({
  root: {
    marginLeft: 15,
    color: 'white',
  },
});

const ChannelSwitcher = () => {
  const { info, status, changeChannel, readyToDownload, downloadUpdateAndInstall } = useContext(LauncherContext);
  const [channel, setChannel] = useState(info.channel);
  const classes = useStyles();

  const handleChangeChannel = (event: any) => {
    const newChannel = event.target.value;
    setChannel(newChannel);
    changeChannel(newChannel);
  };

  const handleDownload = () => downloadUpdateAndInstall();

  return (
    <>
      <Select className={classes.root} value={channel} onChange={handleChangeChannel}>
        {info.channels.map((value: string) => (
          <MenuItem key={value} value={value}>{value}</MenuItem>
        ))}
      </Select>
      {status}
      {readyToDownload && <button onClick={handleDownload}>Download and install</button>}
    </>
  );
};

export default ChannelSwitcher;
