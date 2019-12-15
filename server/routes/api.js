const express = require('express')
const router = express.Router()
const City = require('../model/City')
const request = require('request')
const moment = require('moment')
const bodyParser = require('body-parser')
const apiKey = 'ec49e0da60fcfb3dc2c110193e29469b'

router.use(bodyParser.json())


const toTitleCase = (city) => {
    return city
      .toLowerCase()
      .split(/[\s-]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
}

router.get('/city/:cityName', function(req,res){
    let city = toTitleCase(req.params.cityName)
    request(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`, function(err,response){
        res.send(response.body)
    })    
})

router.get('/cities', function(req,res){
    City.find({}).then(
        function(cities){
            res.send(cities)
        })
})

router.post('/city', function(req,res){
    let city = new City({
        name: req.body.savedCity.name,
        temperature: req.body.savedCity.temperature,
        condition: req.body.savedCity.condition,
        conditionPic: req.body.savedCity.conditionPic,
        nameRaw: req.body.savedCity.name.replace(/\s/, '')
    })
    city.save()
    res.send( `${req.body.savedCity.name} was added successfully to the DB` )
})

router.delete('/city/:cityName', async function(req,res){
    try {
        await City.deleteOne({nameRaw: req.params.cityName})
        res.send(`${req.params.cityName} was removed successfully from the DB`)
    } catch (e) {
        res.status(500).send("Server Error")
    }
})

router.put('/city/:cityName', function(req, res){
    let city = toTitleCase(req.params.cityName)
    request(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`, async function(err, response){
        try {
            City.update({ name: `${city}`},{$set: {
                temperature: `${response.body.main.temp}`,
                condition: `${response.body.weather[0].description}`,
                conditionPic: `${response.body.weather[0].icon}`
            }}, {multi: false}, function(data){
                res.send(response.body)
            })
        }
        catch (e) {
            res.status(500).send("Server Error")
        }
    })
})

module.exports = router