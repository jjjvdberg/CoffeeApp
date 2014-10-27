var _sys = require("sys");
var _http = require("http");
var _path = require("path");
var _url = require("url");
var _fileSystem = require("fs");
var _io = require("socket.io");

var GRABBA = {};
GRABBA.users = new Array();
GRABBA.configs = {};

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
    delete GRABBA.configs[socket.id];
    connection.emit("update users",JSON.stringify(GRABBA.configs));
  });
  
  socket.on("config", function(name,drink){
      _sys.puts(socket.id + " user " + name + " wants " + drink);
      GRABBA.configs[socket.id] = {name:name,drink:drink};
      connection.emit("update users",JSON.stringify(GRABBA.configs));
  });
});

httpServer.listen(8080);