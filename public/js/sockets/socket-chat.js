const socket = io();

const URLparams = new URLSearchParams(window.location.search);

if (!URLparams.get('name') || !URLparams.get('room')) {
    window.location.href = 'index.html';
    throw new Error('The name and the room are required');
}

const user = {
    name: URLparams.get('name'),
    room: URLparams.get('room')
}

socket.on('connect', () => {
    socket.emit('enterChat', user, (resp) => {
        console.log(resp);
    });

    socket.on('sendMessage', (data) => {
        console.log(data);
    });

    socket.on('loadActiveUsers', (data) => {
        console.log(data);
    });

    // PRIVATE MESSAGES.
    socket.on('privateMessage', (message) => {
        console.log(message);
    });
});


socket.on('disconnect', () => {
    console.log('Disconnected from the server');
});