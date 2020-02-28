import { makeStyles } from '@material-ui/core/styles';
import { TITLE_GREY } from 'styles/colors';

export default makeStyles({
  root: {
    backgroundColor: 'transparent',
  },
  cell: {
    fill: 'white',
    color: 'white',
  },
  head: {
    color: TITLE_GREY,
  },
});
