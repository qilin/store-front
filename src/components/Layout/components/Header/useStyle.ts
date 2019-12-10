import { makeStyles } from '@material-ui/core/styles';
import { BACKGROUND_DARK } from 'styles/colors';

export default makeStyles({
  root: {
    backgroundColor: BACKGROUND_DARK,
    padding: '35px 45px',
    display: 'flex',
    alignItems: 'center',
  },
  logoContainer: {
    padding: 15,
    borderRadius: 4,
    display: 'inline-block',
    backgroundColor: 'rgba(8, 8, 8, 0.35)',
  },
  logoText: {
    color: 'white',
  },
});
