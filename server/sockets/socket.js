const {
    Users
} = require('../classes/User');

const {
    socket
} = require('../server');

const {
    sendMessage
} = require('../utilities/utilities.js');

const users = new Users();

socket.on('connection', (client) => {

    client.on('enterChat', (data, callback) => {
        if (!data.name || !data.room) {
            return callback({
                ok: false,
                msj: 'The name and the room are required for enter in the chat'
            })
        }

        client.join(data.room);

        users.addUser(client.id, data.name, data.room);

        callback(users.getUsersByRoom(data.room));

        client.broadcast.to(data.room).emit('loadActiveUsers', users.getUsersByRoom(data.room));
    });

    client.on('sendMessage', (data) => {

        const user = users.getUserById(client.id);

        client.broadcast.to(user.room).emit('sendMessage', sendMessage(user.name, data.message));
    });

    // PRIVATE MESSAGES.
    client.on('privateMessage', (data) => {

        const user = users.getUserById(client.id);

        client.broadcast.to(data.to).emit('privateMessage', sendMessage(user.name, data.message));
    });

    client.on('disconnect', () => {
        const userDisconnected = users.deleteUserById(client.id);

        client.broadcast.to(userDisconnected.room).emit('sendMessage', sendMessage('Administrator', `${userDisconnected.name} is offline`));

        client.broadcast.to(userDisconnected.room).emit('loadActiveUsers', users.getUsersByRoom(userDisconnected.room));
    });
});