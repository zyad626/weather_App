const request = require('request')

const geocaode = (address , callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiemV5YWR5YXNzZXIiLCJhIjoiY2s1eTl1ZjYzMWh0eDNrbzBmcjhtNDZtZSJ9.ar1omLFyt9QYa7kB9uBtPw&limit=1'
    request({url : url , json : true} , (error , response)=>{
        if(error){
            callback('Unable to connect to location services!' , undefined)
        }
        else if(response.body.features.length === 0){
            callback('Location not found. Try another search')
        }
        else{
            callback(undefined , {
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location : response.body.features[0].place_name
            })
        }
    })
}
module.exports = geocaode