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
