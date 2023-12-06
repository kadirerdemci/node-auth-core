const cacheMiddleware = (duration) => {
  const cache = {};

  return (req, res, next) => {
    const key = req.url;
    const cachedData = cache[key];

    if (cachedData) {
      return res.json(cachedData);
    }

    res.sendResponse = res.json;
    res.json = (body) => {
      cache[key] = body;
      res.sendResponse(body);
    };

    setTimeout(() => {
      delete cache[key];
    }, duration);

    next();
  };
};
module.exports = cacheMiddleware;
