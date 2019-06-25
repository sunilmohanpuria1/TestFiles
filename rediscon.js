const redis = require('redis');
const config = require('./config.json');
const client = redis.createClient({
    host : config.redis.host,  
    no_ready_check: true,
    auth_pass: config.redis.password,                                                                                                                                                           
});  
client.on('connect', () => {   
    global.console.log("connected");
});

module.exports = client;