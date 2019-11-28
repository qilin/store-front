import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { isEnvDefined, env } from 'helpers';

const App: React.FC = () => {
  if (!isEnvDefined()) {
    return <div>Environment variables is not defined</div>;
  }

  return (
    <>
      <CssBaseline />
      <p>BASE_URL: {env('AUTH_URL')}</p>
      <p>API_URL: {env('API_URL')}</p>
    </>
  );
};

export default App;
