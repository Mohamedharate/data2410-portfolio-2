const Prom = require('prom-client');
const Register = require('prom-client').register;
const { Counter } = require('prom-client');
const { Summary } = require('prom-client');
const ResponseTime = require('response-time');

const numOfRequests = new Counter({
    name: 'minitwit_numOfRequests',
    help: 'Number of requests made',
    labelNames: ['method'],
})

const responses = new Summary({
    name: 'minitwit_responses',
    help: 'Response time in millis',
    labelNames: ['status', 'path'],
});

module.exports.startCollection = function () {
    Prom.collectDefaultMetrics();
};

module.exports.requestCounters = function (req, res, next) {
    if (req.path !== '/metrics') {
        numOfRequests.inc({ method: req.method });
    }
    next();
};
module.exports.responseCounters = ResponseTime((req, res, time) => {
    if (req.url !== '/metrics') {
        const endpoint = req.path.match('/[a-zA-Z]*');
        responses.labels(res.statusCode, endpoint[0]).observe(time);
    }
});

module.exports.injectMetricsRoute = async function (req, res) {
    res.set('Content-Type', Register.contentType);
    res.end(Register.metrics());
};

module.exports.numOfRequests = numOfRequests;
module.exports.responses = responses;