const express = require('express')
const app = express();

// http server using express configuration
const http = require('http')
const server = http.createServer(app)

// socket io configuration
const socketIO = require('socket.io')
const io = socketIO(server)

module.exports = {io}

require('./sockets/socket')

const path = require('path')


const publicPath = path.resolve(__dirname, '../public')
const port = process.env.PORT || 3000

app.use(express.static(publicPath))

server.listen(port, (err) => {

    if (err) throw new Error(err)

    console.log(`Server runs on port ${ port }`)

});





