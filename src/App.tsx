import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import MainPage from 'pages/MainPage';
import { isEnvDefined, env, ramblerAuth } from 'helpers';
import { User } from 'types';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const onInit = (user: User) => {
    setUser(user);
    setLoading(false);
  };

  const onLogout = () => {
    ramblerAuth.logout();
    setUser(null);
  };

  const onLogin = () => {
    ramblerAuth.openAuth();
  };

  useEffect(() => {
    ramblerAuth.init(onInit);
  }, []);

  if (!isEnvDefined()) {
    return <div>Environment variables is not defined</div>;
  }

  return (
    <Router>
      <CssBaseline />
      <p>BASE_URL: {env('AUTH_URL')}</p>
      <p>API_URL: {env('API_URL')}</p>
      <div>
        {loading && <div>loading...</div>}
        {!loading && user && <div>{user.display.display_name} <button onClick={onLogout}>Выход</button></div>}
        {!loading && !user && <button onClick={onLogin}>Войти</button>}
      </div>
      <Switch>
        <Route key="/" path="/" component={MainPage} />
      </Switch>
    </Router>
  );
};

export default App;
