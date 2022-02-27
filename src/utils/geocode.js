const request = require('request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicGVsczI4NiIsImEiOiJja3p1bmJ5d2swNXIzMnd1ajVlOW5naWtvIn0.5AmLwYVp_csgy4c8OcK1WQ&limit=1'
    request({url, json: true}, (error, {body}) => {
        if (error) {

            callback('Unable to Connect to Weather Service', undefined)

        } else if (body.features.length === 0) {

            callback('Unable to Find Location', undefined)

        }  else {

            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })

        }
    })
}

module.exports = geocode