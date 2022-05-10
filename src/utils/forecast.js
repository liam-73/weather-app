const request = require('request');

const forecast = (lat, lng, callback) => {
    const url = 'https://api.ambeedata.com/weather/latest/by-lat-lng?lat='+ encodeURI(lat) + '&lng=' + encodeURI(lng) + '&filter=hourly&units=si&x-api-key=c1fc8134031f69982faef7f4c20749aec4fb98cdc3877d09aa0167c39da6917b'
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location services!');
        } else if(!body.data){
            callback('Unable to find location!');
        } else {
            callback(undefined, "It's currently " + body.data.apparentTemperature + " degrees out. It is " + body.data.summary.toLowerCase() + "." );
        }
    })
};

module.exports = forecast;