const express = require('express')
const routes = require('./routes/index.js')

const app = express()
app.use('/users', routes.users)
app.use('/shows', routes.shows)

const port = 3000
app.listen(port)
