export default (error, storage, transport) => {
  if (error.errors.code === "unauthorized") {
    transport.registerAccessToken(null);
    storage.sessionAdd({});
    storage.userAdd({});
  }

  throw error;
}
