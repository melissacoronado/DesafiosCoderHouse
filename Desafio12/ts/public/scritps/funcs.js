const socket = io();

socket.on('socketMsg', data =>{
    alert(data)
})

console.log(100)