if (!navigator.mediaDevices) {
    document.body.textContent = 'Cannot use media devices.'
}
const socket = new WebSocket('wss://localhost:3000/wss');

// use MediaDevices API
// docs: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
let video = document.getElementById('anchor');
navigator.mediaDevices.getUserMedia({video: true})
    .then(stream => { video.srcObject = stream })
    .catch(error => {
        document.body.textContent = 'Could not access the camera. Error: ' + error.name
    })

// button events
document.getElementById('start-stream').addEventListener('click', () => startStream())
document.getElementById('stop-stream').addEventListener('click', () => stopStream())

// render processing
let canvas = document.getElementById('capture')
let context = canvas.getContext('2d')
let stream = null
const startStream = () => {
    // stream object has created, nothing to do.
    if (stream) { return }
    document.getElementById('message').innerText = 'Streaming: ON'
    // use canvas to render image data and send to server
    stream = setInterval(() => {
        context.drawImage(video, 0, 0, 640, 480);
        socket.send(JSON.stringify({
            room: 'streaming',
            data: {
                image: canvas.toDataURL('image/webp'),
                audio: '' // TODO add audio stream
            }
        }))
    }, 40); // 25fps = 1s / 40ms
}
const stopStream = () => {
    // no stream object, nothing to do.
    if (!stream) { return }
    document.getElementById('message').innerText = 'Streaming: OFF'
    // clear render interval
    clearInterval(stream)
    stream = null
}