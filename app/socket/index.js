'use strict';
const helper = require('../helpers');

module.exports = (io, app) => {
    let allrooms = app.locals.chatrooms;

    allrooms.push({
        room: 'Good Food',
        roomID: '0001',
        users: []
    });

    io.of('/roomslist').on('connection', socket => {
        console.log('Socket.io connected');

        socket.on('getChatrooms', () => {
            socket.emit('chatRoomsList', JSON.stringify(allrooms));
        });

        socket.on('createNewRoom', newRoomInput => {
            if(!helper.findRoomByName(allrooms, newRoomInput)) {
                allrooms.push({
                    room: newRoomInput,
                    roomID: helper.randomHex(),
                    users: []
                });
                socket.emit('chatRoomsList', JSON.stringify(allrooms));
                socket.broadcast.emit('chatRoomsList', JSON.stringify(allrooms));
            }
        });
    });

    io.of('/chatter').on('connection', socket => {
        socket.on('join', data => {
            let usersList = helper.addUserToRoom(allrooms, data, socket);
            //Update the list of users
            socket.broadcast.to(data.roomID).emit('updateUserList', JSON.stringify(usersList.users));
            socket.emit('updateUsersList', JSON.stringify(usersList.users));
        });

        socket.on('disconnect', () => {
           let room = helper.removeUserFromRoom(allrooms, socket);
           socket.broadcast.to(room.roomID).emit('updateUsersList', JSON.stringify(room.users));
        });

        socket.on('newMessage', data => {
            socket.to(data.roomID).emit('inMessage', JSON.stringify(data));
        });
    });
};