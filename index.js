var WebSocketServer = require("ws").Server
var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 5000

app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)

var wss = new WebSocketServer({server: server})
console.log("websocket server created")
const clients = []
wss.on("connection", function(client) {
  clients.push(client)
  client.on("message",function(payload){
            clients.forEach((c) => c!==client && c.send(payload));
            })
  client.on("close", function() {
    const index = clients.indexOf(client)
    clients.splice(index,1)
    console.log("websocket connection close")
  })
})
