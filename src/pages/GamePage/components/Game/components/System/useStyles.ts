import { makeStyles } from '@material-ui/core/styles';
import colors from 'styles/colors';

export default makeStyles({
  root: {
    backgroundColor: 'transparent',
    color: 'white',
  },
  table: {
    color: 'white',
  },
  cell: {
    color: 'white',
  },
  head: {
    color: colors.TITLE_GREY,
    textTransform: 'uppercase',
  },
});
