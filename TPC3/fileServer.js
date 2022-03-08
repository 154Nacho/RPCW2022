const http = require('http');
var url = require('url');

function generateMainPage()
{
    page = "<body>Exemplo de Página Principal</body>"
    return page
}

http.createServer(function(req,res) {
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)
    var myurl = url.parse(req.url, true).pathname
    if(myurl == "/"){
        res.writeHead(200,{'Content-Type': 'text/html; charset = utf-8'});
        res.write(generateMainPage())
        res.end()
    }
    else if (myurl == "/alunos") {
        res.writeHead(200,{'Content-Type': 'text/html; charset = utf-8'});
        res.write("<p>Página com a tabela de alunos</p>")
        res.end()
    }
    else {
        res.writeHead(200,{'Content-Type': 'text/html; charset = utf-8'});
        res.end('<p>Rota não suportada: ' + req.url + '</p>')
    }
}).listen(4000)

console.log('Servidor à escuta na porta 4000...')