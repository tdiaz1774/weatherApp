const request = require('request')

const forecast = (city, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a4962bc1cab77f5f66647ab6c3973c73&query=' + city
    console.log(url)
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location!', undefined)
        }     
        else {
            
            callback(undefined, response.body.location.name + "\n" + response.body.location.region + ', ' + response.body.location.country + '. Local time is ' + response.body.location.localtime + '. Weather ' + response.body.current.weather_descriptions[0] + '. Actual Temp: ' + response.body.current.temperature + ' celsius. Humidity: ' + response.body.current.humidity + ' grados')
        }
    })
}

module.exports = forecast