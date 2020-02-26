import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, LinearProgress } from '@material-ui/core';
import { LauncherContext } from 'Launcher';
import { BACKGROUND_DARK } from 'styles/colors';
import { useTranslation } from 'react-i18next';

const useStyle = makeStyles({
  root: {
    backgroundColor: BACKGROUND_DARK,
    height: '100vh',
    color: 'white',
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appInfoContainer: {
    padding: 10,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  loader: {
    marginTop: 15,
    color: 'white',
  },
  progressWrapper: {
    width: 500,
    margin: '10px 0',
  },
});

const LauncherUpdater = () => {
  const {
    status,
    info,
    versionToDownload,
    updateError,
    downloading,
    downloadProgress,
  } = useContext(LauncherContext);

  const { t } = useTranslation();
  const classes = useStyle();

  return (
    <div className={classes.root}>
      <Typography variant="h6">
        {t(`update_status.${status}`, { currentVersion: info && info.version, versionToDownload })}
      </Typography>
      {updateError && <Typography variant="h6">{t(`error_message.${updateError.code}`, updateError.code)}</Typography>}
      {info && (
        <div className={classes.appInfoContainer}>
          <div>name: {info.name}</div>
          <div>version: {info.version}</div>
          <div>channel: {info.channel}</div>
        </div>
      )}
      {downloading &&
        <div className={classes.progressWrapper}>
          <LinearProgress variant="determinate" value={(downloadProgress && downloadProgress.percent) || 0} />
        </div>}
      {downloading && <div>Speed: {downloadProgress && downloadProgress.bytesPerSecond} bytesPerSecond</div>}
    </div>
  );
};

export default LauncherUpdater;
