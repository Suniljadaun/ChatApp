const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var audio = new Audio("Message notification.mp3")
const append = (message, position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message',position);
    // messageElement.classList.add(position);
    messageContainer.append(messageElement);
   if(position == 'left')
        audio.play();

}


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}`,'right');
    socket.emit('send',message);
    messageInput.value = '';
})

const names = prompt("Enter your name to join");
socket.emit('new-user-joined',names);   

socket.on('user-joined', function(name){
    append(`${name} joined the chat`,'right')
})
socket.on('recieve', function(data){
    append(`${data.name}:${data.message}`,'left')
})
socket.on('left', function(name){
    append(`${name} left the chat`,'reght')
})