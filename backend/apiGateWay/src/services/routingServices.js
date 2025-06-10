const { createProxyMiddleware } = require('http-proxy-middleware');
const services = require('./services')



//round robin for choose a serviceUrl for serviceName
function roundRobin(serviceName) {
    const serviceUrls = services[serviceName]
    const useUrl = services[serviceName][globalThis.valueRobin[serviceName]]
    globalThis.valueRobin[serviceName] = (globalThis.valueRobin[serviceName] + 1) % serviceUrls.length
    return useUrl
}


const routingServices = (app) => { // implement with loadbalancing for each service

    Object.keys(services).forEach((serviceName) => {

        app.use(`/api/${serviceName}`, createProxyMiddleware({
            target: roundRobin(serviceName) + `/api/${serviceName}`,
            changeOrigin: true,
            ws: true,
            pathRewrite: {
                [`^/api/${serviceName}`]: '',
            },
            // router: () => roundRobin(serviceName), // luôn chọn target mới mỗi request
            onError(err, req, res) {
                console.error(`Proxy error on ${req.url}:`, err.message);
                if (!res.headersSent) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                }
                res.end(JSON.stringify({ error: 'Proxy error', details: err.message }));
            }
        }))

    })
}

module.exports = { routingServices }