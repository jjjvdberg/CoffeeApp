var http = require("http");
var server = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("<!DOCTYPE 'html'>");
  response.write("<html>");
  response.write("<head>");
  response.write("<title>CoffeeApp</title>");
  response.write("</head>");
  response.write("<body style='background-color:#309ABA;color:white;text-align:center;font-family:verdana'>");
  response.write("What may I serve thee?");
  response.write("</body>");
  response.write("</html>");
  response.end();
});

server.listen(8080);
console.log("CoffeeApp Server is listening");