var cool = require('cool-ascii-faces');
var express = require('express');  
var app = express();  
var server = require('http').Server(app);  
var io = require('socket.io')(server);

var messages = [{  
  id: 1,
  bebida: "Bebida",
  mesa: "mesa",
  plato: "plato",
  nombreCliente: "cliente"
}];

app.use(express.static('public'));

app.get('/hello', function(req, res) {  
  res.status(200).send("Hello World!");
});

io.on('connection', function(socket) {  
  console.log('Alguien se ha conectado con Sockets');
  socket.emit('messages', messages);

  socket.on('new-message', function(data) {
    messages.push(data);

    io.sockets.emit('messages', messages);
  });
});

server.listen(5000, function() {  
  console.log("Servidor corriendo en http://localhost:5000");
});

