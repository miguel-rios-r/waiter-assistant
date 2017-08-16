var socket = io.connect('http://localhost:8000', { 'forceNew': true });

socket.on('messages', function(data) {  
  console.log(data);
  render(data);
})

function render (data) {  
  var html = data.map(function(elem, index) {
    return(`<tr>
              <td><em>${elem.mesa}</em></td>
              <td><em>${elem.nombreCliente}</em></td>
              <td><em>${elem.bebida}</em></td>
              <td><em>${elem.plato}</em></td>
            </tr>
            `);
  }).join(" ");

  document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {  
  var message = {
    nombreCliente: document.getElementById('username').value,
    mesa: document.getElementById('mesa').value,
    bebida: document.getElementById('bebida').value,
    plato: document.getElementById('plato').value
  };

  socket.emit('new-message', message);
  return false;
}

