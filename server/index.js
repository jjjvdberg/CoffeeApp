var _sys = require("sys");
var _http = require("http");
var _path = require("path");
var _url = require("url");
var _fileSystem = require("fs");

_http.createServer(function(request,response) {
    var path = _url.parse(request.url).pathname;
    var fullPath = _path.join(process.cwd(),path);
    _fileSystem.exists(fullPath,function(exists){
       if(!exists) {
           response.writeHeader(404);
           response.end();
       } else {
           _fileSystem.readFile(fullPath,"binary",function(error, file) {
              if(error) {
                  response.writeHeader(500);
                  response.end();
              } else {
                  response.writeHeader(200);
                  response.write(file, "binary");
                  response.end();
              }               
           });
       }
    });
}).listen(8080);
_sys.puts("Server running on 8080");