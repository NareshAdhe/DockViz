const socketServices = (io) => {
  io.on("connection", (socket) => {
    console.log(`[Socket.IO]: User Connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`[Socket.IO]: User Disconnected: ${socket.id}`);
    });
  });
};

export default socketServices;
