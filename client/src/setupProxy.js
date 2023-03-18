const proxy = require('http-proxy-middleware').createProxyMiddleware;



module.exports = function (app) {
  let environment = process.env.NODE_ENV || 'development';
  let baseURL = '';
  if (environment == 'development') {
    baseURL = 'http://localhost:5000';
  } else {
    baseURL = 'https://academiesalumni-production.up.railway.app';
  }
  app.use(proxy(`/auth/**`, { target: baseURL }));
  app.use(proxy(`/api`, { target: baseURL, changeOrigin: true }));
};