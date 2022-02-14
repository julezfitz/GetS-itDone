const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
	app.use(
		"/user/session",
		createProxyMiddleware({
			target: "http://localhost:8001",
			changeOrigin: true,
		})
	);
};
