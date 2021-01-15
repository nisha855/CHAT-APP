const socket=io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
//jb bhi msgs aaynge toh kaha daalna h,container k andr
var audio=new Audio('ting.mp3');




const append=(message, position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);//for showing ki somebody joined the chat
    if(position=='left')
    audio.play();
}


//prompt message
//ask new user for his/her name and let the server know
const name=prompt("enter your name to join");
socket.emit('new-user-joined',name);

//listen to user joined wala event
//agar kisi user ne join kiya
//if a new user joins,receive his/her from the server
socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'right')
})

//if server sends the msg,receive it
socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,'left')
})

//if a user leaves the chat,append the info to the container
socket.on('left',name=>{
    append(`${name} left the chat`,'right')
})

//if the form gets submitted, send server the msg
//'e' se page nii reload hoga
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send',message);
    messageInput.value=''
})