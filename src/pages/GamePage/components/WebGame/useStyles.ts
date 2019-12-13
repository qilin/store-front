import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  root: {
    minHeight: '592px',
    position: 'relative',
  },
  button: {
    color: 'white',
    backgroundColor: '#28bc00',
    '&:hover': {
      backgroundColor: '#24a900',
    },
    transition: 'background-color 200ms',
  },
  frameWrapper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    backgroundColor: '#343b4c',
    color: 'white',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    margin: 0,
    border: 0,
  },
  frame: {
    width: '80vw',
    height: '80vh',
  },
  frameHeader: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '4px 12px',
    borderBottom: '1px solid white',
  },
  icon: {
    fontSize: 12,
  },
  iconButton: {
    padding: 0,
  },
});
