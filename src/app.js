const express = require('express');
const path = require('path');
const hbs = require('hbs');
const { text } = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Setup handlebars engin and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);
 
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'liam'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
         return res.send({error});
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error});
            }
    
            res.send({
                location: location,
                forecast: forecastData
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('wrongurl',{
        title: '404',
        name: 'liam',
        errorMessage: 'Help article not found'
    });
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'liam',
        errorMessage: 'Page not found'
    });
});

app.listen(3000, () => {
    console.log('Server is listening at port 3000.');
});