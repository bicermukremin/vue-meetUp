var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http, { pingTimeout: 60000 });

/* app.get("/", function(req, res) {
    res.send("Burası anasayfa");
}); */

require("./socket")(io);

http.listen(3001, function() {
    console.log("server connection");
});
