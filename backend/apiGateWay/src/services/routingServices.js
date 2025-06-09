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
            target: roundRobin(serviceName),
            changeOrigin: true,
            ws: true
        }))
    })


}

module.exports = routingServices