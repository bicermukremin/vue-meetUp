module.exports = function(io) {
    io.on("connection", function(socket) {
        console.log("connection has been established");

        socket.on("meetup/subscribe", function(meetupId) {
            console.log("joining meetup ", `meetup-${meetupId}`);
            socket.join(`meetup-${meetupId}`);
        });

        socket.on("meetup/unsubscribe", function(meetupId) {
            console.log("leaving meetup ", `meetup-${meetupId}`);
            socket.leave(`meetup-${meetupId}`);
        });

        socket.on("meetup/postSaved", function(payload) {
            console.log("emitting to meetup", `meetup-${payload.meetup}`);
            socket
                .to(`meetup-${payload.meetup}`)
                .emit("meetup/postPublished", payload.post);
            console.log("sended to meetup", `post-${payload.post.text}`);
        });
    });
};
