const asyncHandler = (requestFunction) => (req, res, next) => {
  return Promise.resolve(requestFunction(req, res, next)).catch((error) =>
    next(error)
  );
};

export { asyncHandler };
