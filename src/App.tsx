import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import 'i18n';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import MainPage from 'pages/MainPage';
import GamePage from 'pages/GamePage/components/Game';
// import GamePage from 'pages/GamePage';
import { isEnvDefined } from 'helpers';
import Layout from 'components/Layout';

const App = () => {
  if (!isEnvDefined()) {
    return <div>Environment variables is not defined</div>;
  }

  return (
    <Router>
      <CssBaseline />
      <Layout>
        <Switch>
          <Route key="/game" path="/game" component={GamePage} />
          <Route key="/" path="/" component={MainPage} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
