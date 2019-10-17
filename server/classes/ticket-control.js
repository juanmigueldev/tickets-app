const fs = require('fs')
const Ticket = require('./ticket')

class TicketControl {

    constructor() {
        console.log(Ticket);
        this.lastTicket = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.ticketsNextToAttend = [];

        let data = require('../data/data.json')

        if (data.today === this.today) {
            this.lastTicket = data.lastTicket;
            this.tickets = data.tickets;
            this.ticketsNextToAttend = data.ticketsNextToAttend;
        } else {
            this.restart();
        }
    }

    restart() {
        this.lastTicket = 0;
        this.tickets = [];
        this.ticketsNextToAttend = [];
        this.saveData();
    }

    getLastTicket() {
        return this.lastTicket;
    }

    getNextTicketsToAttend() {
        return this.ticketsNextToAttend;
    }

    nexTicket() {
        this.lastTicket += 1;        
        let ticket = new Ticket(this.lastTicket, null);
        this.tickets.push(ticket);

        this.saveData()

        return `Ticket ${this.lastTicket}`
    }

    attendTicket(desktop){

        if(this.tickets.length === 0)
            return 'There are no tickets to attend';

        let ticketNumber = this.tickets[0].number;
        // deletes first ticket        
        this.tickets.shift();

        let ticketToAttend = new Ticket(ticketNumber, desktop);
        this.ticketsNextToAttend.unshift(ticketToAttend);

        if(this.ticketsNextToAttend.length > 4){
            this.ticketsNextToAttend.pop();
        }

        this.saveData();

        return ticketToAttend;
    }

    saveData() {
        let json = {
            lastTicket: this.lastTicket,
            today: this.today,
            tickets: this.tickets,
            ticketsNextToAttend: this.ticketsNextToAttend
        }

        let jsonstring = JSON.stringify(json);
        fs.writeFileSync('server/data/data.json', jsonstring);
    }
}


module.exports = {
    TicketControl
}
