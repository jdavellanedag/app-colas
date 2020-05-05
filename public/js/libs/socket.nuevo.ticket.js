// Establecer conexion
var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado al servidor');
});

socket.on('actualStatus', function(data) {
    label.text(data.actual);
});

$('button').on('click', function() {
    socket.emit('nextTicket', null, function(nextTicket) {
        label.text(nextTicket);
    });
});