// this create a utility to handel async functions

const asyncHandler = (requestFunction) => (req, res, next) => {
  return Promise.resolve(requestFunction(req, res, next)).catch((error) =>
    next(error)
  );
};

export { asyncHandler };
