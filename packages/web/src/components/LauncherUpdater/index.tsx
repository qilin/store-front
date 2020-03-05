import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, LinearProgress } from '@material-ui/core';
import { BACKGROUND_DARK } from 'styles/colors';
import { useTranslation } from 'react-i18next';
import { AppInfo, UpdateError, ProgressInfo } from 'types';
import { LauncherLoader } from 'components';

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

interface UpdateProps {
  checking: boolean;
  status: string | null;
  appInfo: AppInfo | null;
  versionToDownload: string | null;
  updateError: UpdateError | null;
  downloading: boolean;
  downloadProgress: ProgressInfo | null;
}

const LauncherUpdater = (props: UpdateProps) => {
  const {
    checking,
    status,
    appInfo,
    versionToDownload,
    updateError,
    downloading,
    downloadProgress,
  } = props;
  const { t } = useTranslation();
  const classes = useStyle();

  if (checking) {
    return <LauncherLoader />;
  }

  if (!appInfo) return null;

  const { version: currentVersion, name, channel } = appInfo;

  return (
    <div className={classes.root}>
      {status && (
        <Typography variant="h6">
          {t(`update_status.${status}`, { currentVersion, versionToDownload })}
        </Typography>
      )}
      {updateError && <Typography variant="h6">{t(`error_message.${updateError.code}`, updateError.code)}</Typography>}
      <div className={classes.appInfoContainer}>
        <div>name: {name}</div>
        <div>version: {currentVersion}</div>
        <div>channel: {channel}</div>
      </div>
      {downloading &&
        <div className={classes.progressWrapper}>
          <LinearProgress variant="determinate" value={(downloadProgress && downloadProgress.percent) || 0} />
        </div>}
      {downloading && <div>Speed: {downloadProgress && downloadProgress.bytesPerSecond} bytesPerSecond</div>}
    </div>
  );
};

export default LauncherUpdater;
