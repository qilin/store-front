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
import { isEnvDefined, env } from 'helpers';
import { Layout } from 'components';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: `${env('API_URL')}/v1/graphql`,
});

const App = () => {
  if (!isEnvDefined()) {
    return <div>Environment variables is not defined</div>;
  }

  return (
    <ApolloProvider client={client}>
      <Router>
        <CssBaseline />
        <Layout>
          <Switch>
            <Route key="/game" path="/game" component={GamePage} />
            <Route key="/" path="/" component={MainPage} />
          </Switch>
        </Layout>
      </Router>
    </ApolloProvider>
  );
};

export default App;
