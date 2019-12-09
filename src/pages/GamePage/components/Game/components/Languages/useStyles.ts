import { makeStyles } from '@material-ui/core/styles';
import colors from 'styles/colors';

export default makeStyles({
  root: {
    backgroundColor: 'transparent',
  },
  cell: {
    fill: 'white',
    color: 'white',
  },
  head: {
    color: colors.TITLE_GREY,
  },
});
