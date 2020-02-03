**1. Answer the question with one line of code.**

a) How to create a secure WebSocket without third party library?
```
const webSocket = new WebSocket("wss://www.example.com/socketserver");
```

b) How to send data to the server?
```
webSocket.send("Here's some text that the server is urgently awaiting!");
```

c) How to receive data from the server?
```
webSocket.onmessage = function (event) {
  console.log(event.data);
}
```

d) How to close a WebSocket connection?
```
webSocket.close();
```