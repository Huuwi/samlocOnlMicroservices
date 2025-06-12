const { createProxyMiddleware } = require('http-proxy-middleware');
const services = require('./services');


if (!globalThis.valueRobin) globalThis.valueRobin = {};

function roundRobin(serviceName) {
    const serviceUrls = services[serviceName];
    if (!globalThis.valueRobin[serviceName]) {
        globalThis.valueRobin[serviceName] = 0;
    }
    const selected = serviceUrls[globalThis.valueRobin[serviceName]];
    globalThis.valueRobin[serviceName] = (globalThis.valueRobin[serviceName] + 1) % serviceUrls.length;
    return selected;
}

const routingServices = (app) => {
    Object.keys(services).forEach((serviceName) => {
        // HTTP proxy
        app.use(`/api/${serviceName}`, createProxyMiddleware({
            changeOrigin: true,
            ws: true,
            pathRewrite: {
                [`^/api/${serviceName}`]: '',
            },
            router: () => {
                const target = roundRobin(serviceName);
                return `${target}/api/${serviceName}`;
            },
            // onProxyReq(proxyReq, req, res) {
            //     console.log(`[FORWARD] [HTTP] ${req.method} ${req.originalUrl}`);
            // },
            // onProxyRes(proxyRes, req, res) {
            //     console.log(`[RESPONSE] [HTTP] ${req.method} ${req.originalUrl} ← ${proxyRes.statusCode}`);
            // },
            // onError(err, req, res) {
            //     console.error(`HTTP Proxy error [${serviceName}] on ${req.url}:`, err.message);
            //     if (!res.headersSent) {
            //         res.writeHead(500, { 'Content-Type': 'application/json' });
            //         res.end(JSON.stringify({ error: 'API Proxy error', details: err.message }));
            //     }
            // }
        }));

        app.use(`/api/${serviceName}/auth`, createProxyMiddleware({
            changeOrigin: true,
            ws: true,
            pathRewrite: {
                [`^/api/${serviceName}`]: '',
            },
            router: () => {
                const target = roundRobin(serviceName);
                return `${target}/api/${serviceName}`;
            },
        }));





    });
};

// Trả về proxy mapping để gắn vào upgrade handler
module.exports = { routingServices };
