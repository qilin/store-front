import { makeStyles } from '@material-ui/core/styles';
import { TITLE_GREY } from 'styles/colors';

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
    color: TITLE_GREY,
    textTransform: 'uppercase',
  },
});
