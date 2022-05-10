const request = require('request');

const forecast = (lat, lng, callback) => {
    const url = 'https://api.ambeedata.com/weather/forecast/by-lat-lng?lat='+ encodeURI(lat) + '&lng=' + encodeURI(lng) + '&filter=minutely&units=si&x-api-key=c1fc8134031f69982faef7f4c20749aec4fb98cdc3877d09aa0167c39da6917b'
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location services!');
        } else if(!body.data){
            callback('Unable to find location!');
        } else {
            callback(undefined, body.data.forecast[0].summary + "It's currently " + body.data.forecast[0].apparentTemperature + " degrees out. There is " + body.data.forecast[0].precipProbability + "% chance of rain.");
        }
    })
};

module.exports = forecast;