const request = require('request');

const geocode = (address,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+ '.json?access_token=pk.eyJ1IjoiZGV2cmF0dGFuIiwiYSI6ImNrNnowaGRndTBrZWkzZXBpb3ljODU0ZzMifQ.nlwJm3jJv89F9tVkz62_2Q&limit=1';
    
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to find the location service',undefined);
        }
        else if (body.features.length === 0){
            callback('unable to find the location. Try a new search',undefined);
        }
        else{
            console.log(JSON.stringify(body.features[0]));
            const latitude  = body.features[0].center[1];
            const longitude = body.features[0].center[0];
            const placeName = body.features[0].place_name;
            callback(undefined,{
                latitude : latitude,
                longitude : longitude,
                place : placeName
            })
        }
    })
    
    }

module.exports = geocode;