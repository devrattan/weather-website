const request = require('request');


const forecast = (latitude,longitude,callback) =>{
    const url = 'https://api.darksky.net/forecast/cfeb8f2a9b08e988430df9f6b2404085/'+latitude+','+longitude+'?units=si';

    
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to find the forecast service',undefined);
        }
        else if (body.error){
            callback('unable to find the location. Try a new search',undefined);
        }
        else{
            
            callback(undefined,body.daily.data[0].summary+' it is currently '+body.currently.temperature+' degrees out .There is a ' +body.currently.precipProbability+'% chances of rain');
                
        
    }
})
}
    



module.exports = forecast;