const axios = require("axios");
const services = require("./services");
const healTime = 1000 * 20;

const healServices = () => {
    setInterval(() => {
        Object.entries(services).forEach(([serviceName, serviceUrls]) => {
            serviceUrls.forEach(async (url) => {
                try {
                    await axios.get(url + "/api");
                    const list = globalThis.valueRobin?.[serviceName];
                    if (list) {
                        const index = list.indexOf(url);
                        if (index == -1) {
                            list.push(url)
                        }
                    }
                } catch (error) {
                    console.log(`[HealthCheck] Service died: ${url}`);
                    const list = globalThis.valueRobin?.[serviceName];
                    if (list) {
                        const index = list.indexOf(url);
                        if (index !== -1) {
                            list.splice(index, 1);
                        }
                    }
                }
            });
        });
    }, healTime);
};

module.exports = healServices;
