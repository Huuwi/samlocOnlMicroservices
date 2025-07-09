const { createProxyMiddleware } = require('http-proxy-middleware');
const services = require('./services');

const fs = require("fs")

// fs.writeFileSync("./test.json", JSON.stringify(services))

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
        const targetBase = roundRobin(serviceName); // GỌI 1 LẦN

        app.use(`/${serviceName}`, createProxyMiddleware({
            target: targetBase,
            changeOrigin: true,
            pathRewrite: {
                [`^/${serviceName}`]: '',
            },
            on: {
                proxyReq: (proxyReq, req, res) => {
                    const rewrittenPath = req.url.replace(`/${serviceName}`, '');
                    console.log(req.url);


                    const logData = {
                        method: req.method,
                        originalUrl: req.originalUrl,
                        forwardedTo: `${targetBase}${rewrittenPath}`, // DÙNG targetBase đã chọn
                        headers: req.headers,
                    };

                    fs.writeFileSync("./test.txt", JSON.stringify(logData, null, 2));
                },
                proxyRes: (proxyRes, req, res) => {
                    console.log(`[ProxyRes] → ${req.method} ${req.url}`);
                },
                error: (err, req, res) => {
                    console.error(`[ProxyError] ${err.message}`);
                },
            },
        }));

        app.use(`/${serviceName}/api/auth`, createProxyMiddleware({ // add login valid 
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
