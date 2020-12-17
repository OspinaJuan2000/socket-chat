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
    socket.emit('enterChat', user, (data) => {
        renderInfoUsers(data);
    });

    socket.on('sendMessage', (data) => {
        renderMessages(data, false);
    });

    socket.on('controlUsers', (data) => {
        renderInfoUsers(data);
    });

    // PRIVATE MESSAGES.
    socket.on('privateMessage', (message) => {
        console.log(message);
    });
});


socket.on('disconnect', () => {
    console.log('Disconnected from the server');
});