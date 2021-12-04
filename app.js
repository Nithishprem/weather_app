require("dotenv").config()
const xss = require("xss-clean")
const rateLimiter = require("express-rate-limit")

const apiKey = process.env.API_KEY
const axios  = require("axios")
const express = require('express')

const app = express()

app.use(express.json())
app.use(express.static('./public'))
app.set('trust proxy', 1)
app.use(rateLimiter({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(xss())

app.post('/weather', (req,res)=>{
    const {city, lat, long} = req.body
    
    if(city){  
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        axios({
            url: url,
            responseType: 'json'
        }).then(data=>res.json(data.data)).catch(data=>res.status(404).json(data.data))
    }else if(lat && long){
        const url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`
        axios({
            url: url,
            responseType: 'json'
        }).then(data=>res.json(data.data)).catch(data=>res.status(404).json(data.data))
    }
})

const port = process.env.PORT || 3000
const start = async ()=>{
    app.listen(port, ()=>{
        console.log(`server is listening on port ${port}...`)
    })
}

start()