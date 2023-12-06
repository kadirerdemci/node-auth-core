// middleware/timingMiddleware.js
const timingMiddleware = (req, res, next) => {
    const startTime = new Date();
  
    res.on('finish', () => {
      const endTime = new Date();
      const elapsedTime = endTime - startTime;
      console.log(`Request completed in ${elapsedTime} milliseconds.`);
    });
  
    next();
  };
  
  module.exports = timingMiddleware;
  