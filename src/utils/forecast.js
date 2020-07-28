const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=dce78ddeef6799c4693c3bd3fb178a6f&query=' + latitude + ',' + longitude + '&units=m';
   
    request({url, json: true}, (error, {body} = {}) => {
        if(error) {
            callback('Unable to connect to the services.!');
        } else if(body.error) {
            callback('Invalid Co-ordinates!');
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. ' + 'It is currently ' + body.current.temperature + ' degrees out.');
        }
    })
}

module.exports = forecast;