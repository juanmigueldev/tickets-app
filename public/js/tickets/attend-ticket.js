
const socket = io();

const $headingDesktop = document.querySelector('h1');
const $btnAttendNewTicket = document.querySelector('button');
const $lblAttentionTicket = document.querySelector('small');

let searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('desktop')){
    window.location = 'index.html';
    throw new Error('Desktop is required');
}

let desktop = searchParams.get('desktop');

$headingDesktop.textContent = `Desktop ${desktop}`

$btnAttendNewTicket.addEventListener('click', function(){
    socket.emit('attendTicket', { desktop }, function(data){

        if(data.err){
            alert(data.message)
            return;
        }

        if(typeof data === "string"){
            $lblAttentionTicket.textContent = 'Not tickets to attend.'
            alert(data);
            return;
        } 
        
        $lblAttentionTicket.textContent = `Ticket ${data.number}`

    })
})
