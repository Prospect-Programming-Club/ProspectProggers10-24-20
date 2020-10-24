const WebSocket = require("ws")
const fs = require('fs');

const server = new WebSocket.Server( { port: 3000} )

var clients = []

function on_connection(client) {
    console.log("New connection!");
  
    clients.push(client);
  
    client.on("message", function onMessage(msg) {
        console.log(msg)
        var json = JSON.parse(msg);
        var type = json.type;
        switch(type){
            case "RequestCode":
                var generatedCode = Math.floor(Math.random() * 100000)
                if(!checkExists(generatedCode)){
                    var fs = require('fs');
                    fs.writeFileSync("./classes/" + generatedCode + ".json", "");
                }
                client.send(generatedCode)
        }
    });
}
  
function broadcast(msg){
    clients.forEach(element => {
        if(element.readyState == WebSocket.OPEN){
            element.send(msg);
        }
    });
}

function checkExists(code){
    var files = fs.readdirSync('./classes');
    files.forEach(element => {
        console.log(element)
        if(element == (code + ".json")){
            return true;
        }
    });
    return false;
}

server.on("connection", on_connection)