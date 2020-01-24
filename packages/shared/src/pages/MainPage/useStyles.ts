import { makeStyles } from '@material-ui/core/styles';
import { BACKGROUND_LIGHT } from '@qilin/shared/src/styles/colors';

export default makeStyles({
  root: {
    backgroundColor: BACKGROUND_LIGHT,
  },
  loaderWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 500,
  },
});
