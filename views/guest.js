const socket = io.connect(window.location.origin)


socket.on("connection", socket => {
    console.log("Socket Connection Established");
    console.log(socket.id);
    socket.send("hello");
    socket.emit("pussy", "cat");
 });
 



