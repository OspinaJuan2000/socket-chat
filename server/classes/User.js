class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        const person = {
            id,
            name,
            room
        };

        this.users.push(person);
    }

    getUserById(id) {
        return this.users.find(user => user.id === id);
    }

    getUsers() {
        return this.users;
    }

    getUsersByRoom(room) {
        const usersByRoom = this.users.filter(user => user.room === room);

        return usersByRoom;
    }

    deleteUserById(id) {
        const userDeleted = this.getUserById(id);
        
        this.users = this.users.filter(user => user.id !== id);

        return userDeleted;
    }
}

module.exports = {
    Users
}