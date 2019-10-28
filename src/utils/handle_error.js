export default (error, storage, transport) => {
  if (error && error.errors && error.errors.code === 'unauthorized') {
    transport.registerAccessToken(null);
    storage.sessionAdd({});
    storage.userAdd({});
  }

  throw error;
};
