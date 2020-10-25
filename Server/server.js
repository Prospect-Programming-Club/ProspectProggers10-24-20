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
            case "SendCode":
                var code = json.code;
                console.log(checkExists(code))
                if(checkExists(code)){ 
                    console.log(code)
                    client.send(JSON.stringify({
                        "type": "ConfirmCode"
                    }))
                }
                return;
            case "RequestCode":
                var generatedCode = Math.floor(Math.random() * 100000)
                if(!checkExists(generatedCode)){
                    var fs = require('fs');
                    fs.writeFileSync("./classes/" + generatedCode + ".json", "");
                }
                client.send(JSON.stringify({
                    "type" : "RespondCode",
                    "code" : generatedCode
                }))
                return;
            case "AddQuestion":
                var question = json.question;
                var code = json.code;
                var fs = require('fs');
                fs.readFile("./classes/" + "9999" + ".json", 'utf8', function(err, data) {
                    if (err) throw err;
                    var contents = JSON.parse(data)
                    contents.push({
                        "question" : question,
                        "responses" : [

                        ]
                    })
                    fs.writeFileSync("./classes/" + "9999" + ".json", JSON.stringify(contents, null, 2));
                });
                return;
            case "AddResponse":
                var reponse = json.reponse;
                var name = json.name;
                var question = json.question;
                var code = json.code;
                var fs = require('fs');
                fs.readFile("./classes/" + code + ".json", 'utf8', function(err, data) {
                    if (err) throw err;
                    var contents = JSON.parse(data)
                    contents.forEach(element => {
                        if(element.question == question){
                            element.reponses.push({
                                "name" : name,
                                "reponse" : reponse
                            })
                        }
                    });
                    fs.writeFileSync("./classes/" + code + ".json", JSON.stringify(contents, null, 2));
                });
                return;
            case "SendQuestion":
                var question = json.question;
                broadcast({
                    "type" : "SendQuestion",
                    "question" : question
                })
                return;
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
    var trueFalse = false;
    var files = fs.readdirSync('./classes');
    files.forEach(element => {
        if(element === (code + ".json")){
            trueFalse = true
        }
    });
    return trueFalse;
}

server.on("connection", on_connection)