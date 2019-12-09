import { makeStyles } from '@material-ui/core/styles';
import colors from 'styles/colors';

export default makeStyles({
  root: {
    padding: '35px 45px',
    backgroundColor: colors.BACKGROUND_LIGHT,
  },
  cardContent: {
    width: '100%',
    height: '150px',
    borderRadius: '4px',
    backgroundColor: 'black',
    overflow: 'hidden',
  },
});
