const fs = require('fs');

class Ticket {
    constructor(number, workspace) {
        this.number = number;
        this.workspace = workspace;
    }
}

class TicketControl {

    constructor() {
        this.last = 0;
        this.toDay = new Date().getDate();
        this.tickets = [];
        this.last4 = [];
        let data = require('../data/data.json');
        if (data.toDay === this.toDay) {
            this.last = data.last;
            this.tickets = data.tickets;
            this.last4 = data.last4;
        } else {
            this.restartCount();
        }
    }

    nextTicket() {
        this.last += 1;
        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);
        this.saveFile();
        return `Ticket ${ this.last }`;
    }

    getLastTicket() {
        return `Ticket ${ this.last }`;
    }

    getLast4Ticket() {
        return this.last4;
    }

    manageTicket(workspace) {
        if (this.tickets.length === 0) {
            return 0;
        }
        let ticketNumber = this.tickets[0].number;
        this.tickets.shift();
        let manageTicket = new Ticket(ticketNumber, workspace);
        this.last4.unshift(manageTicket);
        if (this.last4.length > 4) {
            this.last4.splice(-1, 1);
        }
        console.log('Ultimos 4');
        console.log(this.last4);
        this.saveFile();
        return manageTicket;
    }

    restartCount() {
        this.last = 0;
        this.tickets = [];
        this.last4 = [];
        console.log('Se inicializado el sistema');
        this.saveFile();
    }

    saveFile() {
        let jsonData = {
            last: this.last,
            toDay: this.toDay,
            tickets: this.tickets,
            last4: this.last4
        };

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }

}

module.exports = {
    TicketControl
}