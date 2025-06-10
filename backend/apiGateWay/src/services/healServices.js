const axios = require("axios");
const services = require("./services");
const healTime = 1000 * 5;

const healInterval = () => {
    setInterval(() => {
        Object.entries(services).forEach(([serviceName, serviceUrls]) => {
            serviceUrls.forEach(async (url) => {
                // console.log(url + "/api/" + serviceName);

                try {
                    const res = await axios.get(url + "/api/" + serviceName, { timeout: 1000 });
                    // console.log(res.data);

                    const list = globalThis.services?.[serviceName];
                    if (list) {
                        const index = list.indexOf(url);
                        if (index == -1) {
                            list.push(url)
                        }
                    }
                } catch (error) {
                    // console.log(error);

                    // console.log(`[HealthCheck] Service died: ${url}`);
                    const list = globalThis.services?.[serviceName];

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

module.exports = { healInterval };
