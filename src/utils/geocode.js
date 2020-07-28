const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW1pdHByaXlhbmthciIsImEiOiJja2QxZnB5Z3cxMnhsMnJtdmI0eTRqZ3R0In0.fcpScbDT0sKlsr8Bijeu5w&limit=1'

    request({url, json: true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to the serviecs!');
        } else if (body.features.length === 0) {
            callback('Unable to find any location. Try another search');
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                place_name: body.features[0].place_name
            })
        }
    })
}
module.exports = geocode;