import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import MainPage from 'pages/MainPage';
import { isEnvDefined, env } from 'helpers';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');

  const onInit = (userData: any) => {
    setUser(userData);
    setLoading(false);
  };

  useEffect(() => {
    console.log('did mount', (window as any).ramblerIdHelper);
    init((userData: any) => {
      onInit(userData);
    });
  });

  const openAuth = () => {
    openAuth();
  };

  if (!isEnvDefined()) {
    return <div>Environment variables is not defined</div>;
  }

  return (
    <Router>
      <CssBaseline />
      <p>BASE_URL: {env('AUTH_URL')}</p>
      <p>API_URL: {env('API_URL')}</p>
      <Switch>
        <Route key="/" path="/" component={MainPage} />
      </Switch>
    </Router>
  );
};

export default App;
