const express = require('express')
const path = require('path')
require('./db/mongoose.js')
const hbs = require('hbs')


const userRouter = require('./routers/user')
const testsites = require('./utils/testsites')

const app = express()
const port = process.env.PORT

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
        name: 'Eyasu, Kyle, & Mike'

    })
})

app.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register',
        name: 'Eyasu, Kyle, & Mike',
    })
})

app.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login',
        name: 'Eyasu, Kyle, & Mike',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Eyasu, Kyle, & Mike'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is a help message',
        name: 'Eyasu, Kyle, & Mike'
    })
})

app.get('/search', (req, res) => {
    if (!req.query.municipality) {
        return res.send({
            error: 'You must provide a municipality'
        })
    }

    testsites(req.query.municipality, (error, { testsites } = {}) => {
        
        if (error) {
            return res.send({ error })
        }

        res.send({
            testsites,
            // testsites: testSiteData,
            // location,
            municipality: req.query.municipality
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Eyasu, Kyle, & Mike',
        errorMessage: 'Help ariticle not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Eyasu, Kyle, & Mike',
        errorMessage: 'Page not found'
    })
})

app.use(express.json())
app.use(userRouter)
app.use('/register', userRouter)

app.listen(port, () => {
    console.log('Server is up on ' + port)
})

