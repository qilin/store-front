import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import { isEnvDefined, env } from 'helpers';
import routes from 'routes';

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
        {routes}
      </Switch>
    </Router>
  );
};

export default App;
