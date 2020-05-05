const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('nextTicket', (data, callback) => {
        let next = ticketControl.nextTicket();
        console.log(next);
        callback(next);
    });

    client.emit('actualStatus', {
        actual: ticketControl.getLastTicket(),
        last4: ticketControl.getLast4Ticket()
    });

    client.on('manageTicket', (data, callback) => {
        if (!data.workspace) {
            return callback({
                err: true,
                message: 'El escritorio es necesario'
            })
        }

        let manageTicket = ticketControl.manageTicket(data.workspace);
        callback(manageTicket);
        client.broadcast.emit('last4', {
            last4: ticketControl.getLast4Ticket()
        });
    });
});