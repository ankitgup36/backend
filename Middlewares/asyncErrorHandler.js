exports.asyncErrorHandler = async (err, req, res, next) => {
  res?.status(err?.statusCode || 500)?.json({ Error: err.message, status: 0 });
  next();
};
