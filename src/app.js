const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const port = 3000;

app.use(express.static(publicDirectoryPath));

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Amit Priyankar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Amit Priyankar',
        message: 'This is a help message!'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Amit Priyankar',
        message: 'This is a about page!'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send( {
            error: 'You must provide an address.'
        })
    }
    const address = req.query.address;
    geocode(address, (error, {latitude, longitude, place_name} = {}) => {
        if(error) {
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, data) => {    
            if(error) {
                return res.send({
                    error:error
                })
            }
            
            res.send({
                address: req.query.address,
                forecast: data,
                location: place_name
            });
        } )
    })

   
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Amit Priyankar',
        errorMesssage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Amit Priyankar',
        errorMesssage: 'Page not found.'
    })
})
app.listen(port, () => console.log(`App is listening at http://localhost:${port}`));