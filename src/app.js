const express = require('express');
const app =  express();
const path = require('path');
const hbs  = require('hbs');
const request = require("request");

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const port = process.env.PORT || 3000;

//paths defined for Express config
const publicDirectoryPath = path.join(__dirname,'../public') 
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials') 

//Handlebars setup and views location
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath);

//static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        "title":"RECENT WEATHER",
        "name" : "Dev Rattan"
    })
})

app.get('/about',(req,res)=>{
res.render('about',{
    "title":"ABOUT DEV",
    "name":"DEV RATTAN"
});
})

app.get('/help',(req,res)=>{
    res.render('help',{
        "title":"HELPER HERE",
        "paragraph":"all you need is here",
        "name":"DEV RATTAN"
    })
})

app.get('/weather',(req,res)=>{
   if(!req.query.address){
        return res.json({
        error : "Please enter a valid address"
       })
    } else{
   geocode(req.query.address,(error,{latitude,longitude,place} = {})=>{
    if(error){
        return res.send({
            'error':error
        })
      }     
  forecast(latitude,longitude,(error,forecastData)=>{
       if(error) {
           res.send({
               'error': error
           })
       }
       res.send({
           'address': req.query.address,
           'location': place,
           'data': forecastData
       })
    });
});
}
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:"HELP",
        name:"DEV RATTAN",
        error:"HELP ARTICLE DOES NOT EXIST"
    })
})
app.get('*',(req,res) => {
    res.render('error',{
        title:"404",
        name:"DEV RATTAN",
        error:"Page NOT FOUND"
    })
})
app.listen(port ,()=>{
    console.log('server listening at port '+port);
})