
const socket = io();

socket.on('currentStatus', function (data) {
    if(!data.ticketsNextToAttend || data.ticketsNextToAttend.legth === 0)
        return;
    
    refreshTicketBoard(data.ticketsNextToAttend);
});

socket.on('refreshTicketBoard', function (data) {  
    if(!data.ticketsNextToAttend || data.ticketsNextToAttend.legth === 0)
        return;    
    
    let audio = new Audio('audio/new-ticket.mp3');    
    refreshTicketBoard(data.ticketsNextToAttend);
    audio.play();
});


function refreshTicketBoard(ticketsNextToAttend){
    for (let i = 1; i <= ticketsNextToAttend.length; i++) {
        document.querySelector('#lblTicket'+i).textContent = `Ticket ${ticketsNextToAttend[(i-1)].number}`;
        document.querySelector('#lblDesktop'+i).textContent = `Desktop ${ticketsNextToAttend[(i-1)].desktop}`;       
    }
}