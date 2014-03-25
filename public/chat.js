window.onload = function() {
  var Chat = ( function() {
    var messages = [];
    var socket = io.connect('http://localhost:3700');

    function bindEvents() {
      var sendButton = document.getElementById("send");
      socket.on('message', processMessage);
      sendButton.onclick = sendMessage
    }

    function processMessage(data) {
      var content = document.getElementById("content");
      if(data.message) {
        messages.push(data.message);
        var html = '';
        for(var i=0; i<messages.length; i++) {
          html += messages[i] + '<br />';
        }
        content.innerHTML = html;
      } else {
        console.log("There is a problem with the page JS", data);
      }
    }

    function sendMessage() {
      var field = document.getElementById("field");
      socket.emit('send', { message: field.value });
    }

    function _init() {
      bindEvents();
    }

    return {
      init: _init
    }
  }());

  Chat.init();
}