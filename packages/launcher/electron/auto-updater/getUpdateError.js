const netMessages = [
  'net::ERR_INTERNET_DISCONNECTED',
  'net::ERR_CONNECTION_REFUSED',
  'net::ERR_CONNECTION_RESET',
  'net::ERR_CONNECTION_TIMED_OUT',
  'net::ERR_TIMED_OUT',
  'net::ERR_NETWORK_CHANGED',
];

const getUpdateError = error => {
  const {
    stack = new Error().stack,
    code = 'UNKNOWN_CODE',
    message = 'Unknown Error',
  } = error || {};

  return {
    stack,
    code: netMessages.includes(message) ? message.slice(5) : code,
  };
};

module.exports = getUpdateError;
