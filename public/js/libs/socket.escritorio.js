// Establecer conexion
var socket = io();

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado al servidor');
});

var labelWorkspace = $('h1');
var label = $('small');

var searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
};

var workspace = searchParams.get('escritorio');
labelWorkspace.text('Escritorio ' + workspace);

$('button').on('click', function() {
    socket.emit('manageTicket', { workspace: workspace }, function(data) {
        if (data === 0) {
            alert('No hay más tickets');
            label.text('No hay más tickets');
            return;
        }
        label.text(data.number);
    });
});