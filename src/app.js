const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')

app.use(express.static(publicDirectoryPath))

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(path.join(__dirname, '../templates/partials'))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Kwesi Addo Pels'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is a Useful text',
        title: 'Help',
        name: 'Pels'
    })
})


app.get('/about', (req, res) => {
    res.render('index', {
        title: 'About Us',
        name: 'Kwesi Addo Pels'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        }) 
    } 

    geocode(req.query.address, (error, {latitude, longitude, location}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                location, 
                forecast: forecastData, 
                address: req.query.address
            })
        })
    })


    // res.send({
    //     location: 'Boston',
    //     forecast: "It is clear",
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send({
           error: 'You need to provide a search term'
       }) 
    }

    console.log(req.query.search)
    res.send({
        product: []
    })
})



app.get('/help/*', (req, res) => (
    res.render('404', {
        title: '404',
        name: 'Pels',
        message: 'Help article not found'
    })
))

app.get('*', (req, res) => (
    res.render('404', {
        message: 'Page not Found',
        title: '404',
        nmae: 'Pels'
    })
))

app.listen(port, () => {
    console.log('Server is running at port 3000')
})