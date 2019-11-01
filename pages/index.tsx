import React from 'react';
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { apiUrl },
  serverRuntimeConfig: { secondSecret }
} = getConfig()

const MainPage = () => {
  console.log(secondSecret)
  console.log(apiUrl)

  return (
    <div>API URL: {apiUrl}</div>
  );
}

export default MainPage;
