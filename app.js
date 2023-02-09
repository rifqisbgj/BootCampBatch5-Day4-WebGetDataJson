const express = require('express')
const app = express()
const port = 3000
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan')
const fs = require('fs');

const rawData = fs.readFileSync('./data/contacts.json', 'utf-8')
const contact = JSON.parse(rawData)

app.use((req, res, next) => {
    // 1 Januari 1970
    console.log('Time:', Date.now())
    next()
})

app.use(morgan('dev'))

// akan mengatur file lain yang dapat dibaca, berada pada folder public
app.use(express.static('public'))

// memanggil ejs atau menggunakan ejs sebagai view engine
app.set('view engine', 'ejs')

// menggunakan express-ejs-layouts
app.use(expressLayouts)
// set custom layout to other file location/name
app.set('layout', './layout/mainLayout')

// "{root: __dirname}" client akan ngebaca berdasarkan lokasi file pada server
app.get('/', (req, res) => {
    res.render('index', {
        pageName: 'Home'
        // just add layout for spesific single render (e.g layout: 'layoutlocation')
    });
})

app.get('/about', (req, res, next) => {
    res.render('about', {
        pageName: 'About Page'
    })
})

app.get('/contact', (req, res) => {
    res.render('contact', {
        // melempar data kontak dan disimpan pada array contact
        contact,
        pageName: 'Contact Page'
    })
})

app.get('/contact/create', (req, res) => {
    res.render('formContact', {
        pageName: 'Create Contact Page'
    })
})

// menampilkan data berdasarkan product ID dan query category ID
app.get('/product/:productId/', (req, res) => {
    res.send(`Product ID: ${req.params.productId} <br> Category ID: ${req.query.category}`)
})

app.use('/', (req, res) => {
    res.status(404)
    res.send('page not found')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})