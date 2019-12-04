import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  card: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end',
    minHeight: '100%',
    cursor: 'pointer',
    padding: '2rem',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  content: {
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    zIndex: 2,
    color: 'white',
  },
  tags: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  cover: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  link: {
    color: '#8d96b2',
    fontSize: '8px',
    textDecoration: 'none',
    display: 'inline-block',
    margin: '4px 4px 0 0',
    padding: '0 8px',
    border: '1px solid rgba(199,205,225,0.4)',
    borderRadius: '14.5px',
    cursor: 'pointer',
    transition: 'color 200ms, border 200ms',
    '&:hover': {
      color: 'white',
      border: '1px solid white',
    },
  },
  button: {
    color: '#fff',
    fontSize: '12px',
    marginTop: '20px',
    backgroundColor: '#28bc00',
    '&:hover': {
      backgroundColor: '#24a900',
    },
    transition: 'background-color 200ms',
  },
  genre: {
    margin: '20px 0',
  },
  summary: {
    textAlign: 'left',
    paddingBottom: '16px',
  },
});
