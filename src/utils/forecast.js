const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=0c9047b723e7611f8252f68200d765e5&query='+latitude+ ',' + longitude+'&units=f'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        }
         else{   
                callback(undefined,'It is currently '+body.current.temperature+'. It feels like '+body.current.feelslike+'. The humidity is '+body.current.humidity+' and cloudcover is '+body.current.cloudcover)  
             }
    })
}
module.exports = forecast

