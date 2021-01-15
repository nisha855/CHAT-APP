//node server which will handle socket io connections

//on port 8000
const io = require('socket.io')(8000)

const users={};

// jaise h connection aaye socket m arrow function. ko run kro
//io ko initialize kiya gya h jo ki bahut saare socket instance ko listen krega
io.on('connection',socket =>{
    //socket.io server run kr rhe jo instance h http k jo ki incoming events ko listen krega
     socket.on('new-user-joined',name =>{
       //console.log("New user",name);
       users[socket.id]=name;//name set krna user k andr
       socket.broadcast.emit('user-joined',name);
     });
      
     //receive nam k event ko client.js m listen krega
     socket.on('send',message=>{
         socket.broadcast.emit('receive', {message: message, name: users[socket.id]})

     });

     socket.on('disconnect',message=>{
         socket.broadcast.emit('left',users[socket.id])
         delete users[socket.id];
     });

    
})