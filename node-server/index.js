//This is the node server that will handle the requests (connections)

const io = require('socket.io')(8000);
const users = {};

io.on('connection', socket => {  //is responsible for the communications between the users who are chating.
    socket.on('new-user-joined', name => { //whenever there is an even calles 'new-user-joined' this will append the name paramter ti the users array and all other users will get notificaion that a new user has been joined.
        //console.log(`${name} has newly joined the chat`);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name); //will send all the other users a message to notify that new user is joined except the new user joined.
    })

    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]});
    });
})