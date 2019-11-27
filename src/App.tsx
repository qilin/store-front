import React, { useState, useEffect } from 'react';
import { init, openAuth } from 'ramblerAuth';
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
    <div className="App">
      <p>BASE_URL: {env('AUTH_URL')}</p>
      <p>API_URL: {env('API_URL')}</p>
      {loading && <div>loading...</div>}
      {!loading && user && <div>User Name</div>}
      {!loading && !user && <button onClick={openAuth}>Войти</button>}
    </div>
  );
};

export default App;
