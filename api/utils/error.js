const createError = (status, message) => {
    const err = new Error();
    err.status = status;
    err.message = message + "hata burada";
    return err;
  };
  module.exports = {createError};