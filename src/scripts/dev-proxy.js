const proxyHandler = (req, res, proxyOptions) => {
  console.log(req, res, proxyOptions);
  req.res();
};

module.exports = proxyHandler;
