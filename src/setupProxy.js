
const {createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        createProxyMiddleware('/userService',{
            "target": "https://stagegroupapi.atauro72.com/",
            changeOrigin: true,
        })
    );
    app.use(
        createProxyMiddleware('/token',{
            "target": "https://stageauth.atauro72.com/",
            changeOrigin: true,
        })
    );
};
