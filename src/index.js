const express = require('express')
const path = require('path')
require('./db/mongoose.js')
const hbs = require('hbs')


const userRouter = require('./routers/user')
const testsites = require('./utils/testsites')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs') //setting up handlebars for express
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        name: 'Pistol Pete'

    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Pistol Pete'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is a help message',
        name: 'Pistol Pete'
    })
})

app.get('/search', (req, res) => {
    if (!req.query.municipality) {
        return res.send({
            error: 'You must provide a municipality'
        })
    }

    testsites(req.query.municipality, (error, { name, fulladdr, municipality } = {}) => {
        if (error) {
            return res.send({ error })
        }

        res.send({
            name: req.name,
            // testsites: testSiteData,
            // location,
            municipality: req.query.municipality
        })
    })

    // geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    //     if (error) {
    //         return res.send({ error })
    //     }

    //     forecast(latitude, longitude, (error, forecastData) => {
    //         if (error) {
    //             return res.send({ error })
    //         }

    //         res.send({
    //             forecast: forecastData,
    //             location,
    //             address: req.query.address
    //         })
    //     })
    // })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Pistol Pete',
        errorMessage: 'Help ariticle not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Pistol Pete',
        errorMessage: 'Page not found'
    })
})

app.use(express.json())
app.use(userRouter)

app.listen(port, () => {
    console.log('Server is up on ' + port)
})

