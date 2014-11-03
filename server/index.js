var _sys = require("sys");
var _http = require("http");
var _path = require("path");
var _url = require("url");
var _fileSystem = require("fs");
var _io = require("socket.io");
// TODO move this to a requirement
// var _functions = require("grabba.functions");
function randomInt(low, high) {
    return Math.floor(Math.random() * (high + 1 - low) + low);
}
// end serverfunctions

var GRABBA = {};
GRABBA.users = new Array();
GRABBA.configs = {};
GRABBA.responses = {};
GRABBA.expectedResponses = -1;

var httpServer = _http.createServer(function(request,response) {
    var path = _url.parse(request.url).pathname;
    var fullPath = _path.join(process.cwd(),"..","client",path);
    _fileSystem.exists(fullPath,function(exists){
       if(!exists) {
           response.writeHeader(404,{"Content-Type": "text/plain"});
           response.write("404: Not found\n");
           response.end();
       } else {
           _fileSystem.readFile(fullPath,"binary",function(error, file) {
              if(error) {
                  response.writeHeader(500,{"Content-Type": "text/plain"});
                  response.write(error + "\n");
                  response.end();
              } else {
                  response.writeHeader(200);
                  response.write(file, "binary");
                  response.end();
              }               
           });
       }
    });
});
var connection = _io(httpServer);
_sys.puts("Server running on 8080");

connection.on('connection', function(socket){
  _sys.puts('a user connected');
  GRABBA.users.push(socket.id);
  
  socket.on('disconnect', function(){
    _sys.puts('user disconnected');
    var i = GRABBA.users.indexOf(socket.id);
    GRABBA.users.splice(i,1);
    if(socket.id in GRABBA.configs) {
        addResponse(socket,false);
    }
    delete GRABBA.configs[socket.id];
    connection.emit("update users",GRABBA.configs);
  });
  
  socket.on("config", function(name,drink){
      _sys.puts(socket.id + " user " + name + " wants " + drink);
      GRABBA.configs[socket.id] = {name:name,drink:drink};
      connection.emit("update users",GRABBA.configs);
  });
  
  socket.on("get users", function(){
      connection.emit("update users",JSON.stringify(GRABBA.configs));
  });
  
  socket.on("round start", function() {
      GRABBA.expectedResponses = Object.keys(GRABBA.configs).length;
      GRABBA.responses = {};
      connection.emit("round started");
  });
  
  socket.on("round ready", function(response) {
      addResponse(socket,response);
  });
  
  socket.on("round get order", function() {
    var order = [];
    for(var k in GRABBA.responses) {
       response = GRABBA.responses[k];
       if(response) {
           order.push(GRABBA.configs[k]);
       }
    } 
    connection.emit('round order', order);
  });
  
  function addResponse(socket,response) {
      GRABBA.responses[socket.id] = response;
      var numberOfResponses = Object.keys(GRABBA.responses).length;
      if(GRABBA.expectedResponses === numberOfResponses) {
          var positiveResponses = [];
          for(var k in GRABBA.responses) {
              response = GRABBA.responses[k];
              if(response) {
                  positiveResponses.push(k);
              }
          }
          
          var luckyNumber = randomInt(0,positiveResponses.length - 1);
          for(var k in positiveResponses) {
            var address = positiveResponses[k];
            _sys.puts("sending " + k + "===" + luckyNumber + " = "+ (parseInt(k)===luckyNumber) + " to " + address);
            connection.to(address).emit('round ended', parseInt(k) === luckyNumber);
          }
          connection.emit('round ended');
      }
  }
});

httpServer.listen(8080);