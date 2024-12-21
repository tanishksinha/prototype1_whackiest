
const setupRealTimeUpdates = (io) => {
    io.on('connection', (socket) => {
        console.log('New client connected');

        // Handle events from the client
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
        socket.on('message', (data) => {
            console.log('Message received:', data);
            // Broadcast the message to all clients
            io.emit('message', data);
        });
    });
};

module.exports = { setupRealTimeUpdates };