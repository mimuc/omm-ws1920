const context = document.getElementById('viewer').getContext('2d');
const socket = new WebSocket('wss://localhost:3000/wss');
let image = new Image();
image.onload = () => { context.drawImage(image, 0, 0) };
// subscribe viewing and receive data pushed from server
socket.onmessage = function (event) {
    const message = JSON.parse(event.data);
    if(message.hasOwnProperty('room') && message.hasOwnProperty('data') && message.room === 'viewing') {
        image.src = message.data.image;
        // TODO read audio stream
    }
};