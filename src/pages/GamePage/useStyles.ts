import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#203859',
  },
  button: {
    transition: 'background-color 200ms',
    color: '#fff',
    backgroundColor: '#28bc00',
    '&:hover': {
      backgroundColor: '#24a900',
    },
  },
});
