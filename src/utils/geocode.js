const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURI(address) + '.json?limit=1&access_token=pk.eyJ1IjoibGlhbS0yOCIsImEiOiJjbDJ3N2N2NHEwNnR2M2ttdmx3dDZ1aDFkIn0.l5m0qcs7qL-3fJCp3NNdWw'; 

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location services!');
        } else if(body.features.length === 0){
            callback('Unable to find location!');
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    });
}

module.exports = geocode;