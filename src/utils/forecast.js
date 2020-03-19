const request = require('request')
const forecast = (lat , long , callback)=>{
    const url = 'https://api.darksky.net/forecast/d80f2aa439d71c7d3c25155a69b2bc36/'+lat+','+long+'?lang=en&units=si'
    request({url : url , json : true} , (error , response)=>{
        if(error){
            callback('Unable to connect to weather services!' , undefined)
        }
        else if(response.body.error){
            callback('locataion not found!' , undefined)
        }
        else {
            callback(undefined , response.body.currently.summary+' .It is currently '+response.body.currently.temperature+'C° '+' with '+response.body.currently.precipProbability+'% chance to rain'
           +' and humidity of '+response.body.currently.humidity )
        }
    })
}
module.exports = forecast