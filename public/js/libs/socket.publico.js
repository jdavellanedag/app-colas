// Establecer conexion
var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscriotorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado al servidor');
});

socket.on('actualStatus', function(data) {
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    updateHtml(data.last4);
});

socket.on('last4', function(data) {
    updateHtml(data.last4);
});

function updateHtml(last4) {
    for (var i = 0; i <= last4.length - 1; i++) {
        lblTickets[i].text('Ticket ' + last4[i].number);
        lblEscriotorios[i].text('Escritorio ' + last4[i].workspace);
    }
}