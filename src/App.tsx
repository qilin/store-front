import React from 'react';

import { isEnvDefined, env } from 'helpers';

const App: React.FC = () => {
  if (!isEnvDefined()) {
    return <div>Environment variables is not defined</div>;
  }

  return (
    <div className="App">
      <p>BASE_URL: {env('AUTH_URL')}</p>
      <p>API_URL: {env('API_URL')}</p>
    </div>
  );
};

export default App;
