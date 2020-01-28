import { makeStyles } from '@material-ui/core/styles';
import { TITLE_GREY, BACKGROUND_LIGHT } from '@qilin/shared/src/styles/colors';

export default makeStyles({
  root: {
    padding: '35px 45px',
    backgroundColor: BACKGROUND_LIGHT,
  },
  icon: {
    fontSize: '1.718em',
    fill: 'white',
  },
  title: {
    color: TITLE_GREY,
    padding: '1rem',
  },
});
