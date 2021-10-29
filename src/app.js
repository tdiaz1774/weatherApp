const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express() 
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000


const publicDirectoryPath = path.join(__dirname, '../public') 
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))  


 
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Tomas Diaz'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Tomas Diaz'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Tomas Diaz'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No se encontró la dirección'
        })
    }

    forecast(req.query.address, (error, forecastData) => {
        if (error) {
            res.send({ error })
        }

        res.send({
            clima: forecastData,
            address: req.query.address
        })

        console.log(forecastData)
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        titulo: '404 Page',
        nombre: 'Tomas Diaz',
        errorMessage: 'Help article does not exist'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        titulo: '404 Page',
        nombre: 'Tomas Diaz',
        errorMessage: 'Page does not exist'
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
