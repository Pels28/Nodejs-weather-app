const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6f54bc8086b1f021bdd5644fdee89f9d&query=' + longitude + ',' + latitude +'&units=f'


    request({url, json: true}, (error, {body}) => {
        if (error) {

            callback('Unable to Connect to Weather Service', undefined)

        } else if (body.error) {
            
            callback('Unable to Find Location', undefined)

        }   else {

            const temperature = body.current.temperature
            const feelslike = body.current.feelslike
            callback(undefined, body.current.weather_descriptions[0] +'. It is currently ' + temperature + ' degrees out. There is a ' + feelslike +'% chance of rain. The humidity is ' + body.current.humidity)
        
        }

    })
}

module.exports = forecast