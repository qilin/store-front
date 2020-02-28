import { makeStyles } from '@material-ui/core/styles';
import { BACKGROUND_DARK, BLACK } from 'styles/colors';

export default makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    padding: '35px 45px',
    color: 'white',
    backgroundColor: BACKGROUND_DARK,
  },
  flex: {
    display: 'flex',
  },
  dark: {
    backgroundColor: BLACK,
  },
  iconWrapper: {
    padding: '16px',
    marginRight: '8px',
    fontSize: '1.718em',
    fill: 'white',
    color: 'white',
  },
  icon: {
    fontSize: '1.718em',
    color: 'white',
  },
});
