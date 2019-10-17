
const socket = io();

const $btnNewTicket = document.querySelector('#btnNewTicket')
const $lblNewTicket = document.querySelector('#lblNewTicket')

socket.on('connect', () => {
    console.log('Connected to server');
})


socket.on('disconnect', () => {
    console.log('Disconnected to server');
})

socket.on('currentStatus', function(data){
    if(data.currentTicket > 0)
        $lblNewTicket.textContent = `Ticket ${data.currentTicket}`
    else
        $lblNewTicket.textContent = 'There are no tickets to attend.'
})


$btnNewTicket.addEventListener('click', function(){
    socket.emit('nextTicket', null, function(nextTicket){
        $lblNewTicket.textContent = nextTicket
    })  
})