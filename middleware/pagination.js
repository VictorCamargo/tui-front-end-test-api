module.exports = function (req, res, next) {
  const page = req.query.page || req.body.page || 1;
  const limit = req.query.limit || req.body.limit || 10;

  if (isNaN(page) || isNaN(limit)) {
    throw Error('Page and limit must be a number');
  }

  if (page < 1) {
    throw Error('Page must be greater than 0');
  }

  if (limit < 2 || limit > 100) {
    throw Error('1103');
  }

  req.pagination = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  next();
};
