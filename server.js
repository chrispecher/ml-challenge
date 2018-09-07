const express    = require('express')
const app        = express()
const bodyParser = require('body-parser')

// get the person module from the mock db
const { Person } = require('./database')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const defaultPort = 8080

// router for the api
const router = express.Router()

router.use(function(req, res, next) {
    next()
})

router.route('/persons')
    // create a person (POST http://localhost:8080/api/persons)
    .post(function(req, res) {
        const personId = Person().create(req.body.name)
        res.json({ id: personId, name: req.body.name, clientId: req.body.clientId })
    })
    // list all persons (GET http://localhost:8080/api/persons)
    .get(function(req, res) {
        res.json({ persons: Person().list() })
    })

router.route('/persons/:id')
    // create a person (POST http://localhost:8080/api/persons)
    .patch(function(req, res) {
        Person().rename(req.params.id, req.body.name)
        res.json({ id: req.params.id, name: req.body.name })
    })

// test api root (GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'api root path' })    
})

// bind the routes to the api path
app.use('/api', router)

// listen on specified port for incoming requests
const server = (port) => {
    app.listen(port)
    console.log('listening on port ' + port)
}

if(process.argv.includes('--autostart')) {
    server(defaultPort)
}

module.exports = server

