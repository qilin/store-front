import { makeStyles } from '@material-ui/core/styles';
import colors from 'styles/colors';

export default makeStyles({
  root: {
    padding: '35px 45px',
    backgroundColor: colors.BACKGROUND_LIGHT,
  },
  icon: {
    fontSize: '1.718em',
    fill: 'white',
  },
  title: {
    color: colors.TITLE_GREY,
    padding: '1rem',
  },
});
