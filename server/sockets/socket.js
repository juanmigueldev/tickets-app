const { io } = require('../server')
const { TicketControl } = require('../classes/ticket-control')


const ticketControl = new TicketControl();

io.on('connection', (socket) => {

    // Emit event
    socket.emit('currentStatus', {
        currentTicket: ticketControl.getLastTicket(),
        ticketsNextToAttend: ticketControl.getNextTicketsToAttend()
    })


    // Listen client
    socket.on('nextTicket', (data, callback) => {
        let nextTicket = ticketControl.nexTicket()
        callback(nextTicket)
    })

    socket.on('attendTicket', (data, callback) => {

        if(!data.desktop){
            return callback({
                err: true,
                message: 'Desktop is required'
            })
        }

        let ticketToAttend = ticketControl.attendTicket(data.desktop)
        callback(ticketToAttend)

        if(typeof ticketToAttend === "object"){
            socket.broadcast.emit('refreshTicketBoard', {
                ticketsNextToAttend: ticketControl.getNextTicketsToAttend()
            });
        }        
    })
})