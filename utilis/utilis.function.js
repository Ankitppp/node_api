exports.handleValidResponse = (res, data) => {
  res.status(200).json({ data });
};

exports.handleErrorResponse = (res, err) => {
  res.status(500).json({ message: err.message });
};
