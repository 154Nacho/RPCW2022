const http = require('http');
const url = require('url');
const axios = require('axios')

const header = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>TPC3</title>
</head>
<body>
`

const footer = `
</body>
</html>
`

function generateMainPage()
{
    page = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>TPC3</title>
</head>
<body>
<p><a href="http://localhost:4000/alunos">Lista de Alunos</a></p>
<p><a href="http://localhost:4000/cursos">Lista de Cursos</a></p>
<p><a href="http://localhost:4000/instrumentos">Lista de Instrumentos</a></p>
</body>
</html>
    `
    return page
}

async function generatePaginaAlunos(res) {
    var page = header
    var keys = ['ID','Nome','Curso','Instrumento']
    let result = await axios.get("http://localhost:3000/alunos")
    let data = result.data
    page += `
    <table>
    <thead>
    <tr>
    `
    for(let i=0; i< keys.length; i++){
        let h = keys[i]
        page += `<th>${h}</th>`
    }
    page += '</tr></thead>'

    data.forEach(
        aluno => {
            page += '<tr>'
            page += `<td>${aluno.id}</td>`
            page += `<td>${aluno.nome}</td>`
            page += `<td>${aluno.curso}</td>`
            page += `<td>${aluno.instrumento}</td>`
            page += '</tr>'
        }
    )

    page += '</table>'
    page += footer
    res.write(page)
    res.end()

}

async function generatePaginaCursos(res) {
    var page = header
    var keys = ['ID','Designação','Duração','Instrumento']
    let result = await axios.get("http://localhost:3000/cursos")
    let data = result.data
    page += `
    <table>
    <thead>
    <tr>
    `
    for(let i=0; i< keys.length; i++){
        let h = keys[i]
        page += `<th>${h}</th>`
    }
    page += '</tr></thead>'

    data.forEach(
        curso => {
            page += '<tr>'
            page += `<td>${curso.id}</td>`
            page += `<td>${curso.designacao}</td>`
            page += `<td>${curso.duracao}</td>`
            page += `<td>${curso.instrumento.text}</td>`
            page += '</tr>'
        }
    )

    page += '</table>'
    page += footer
    res.write(page)
    res.end()
}

async function generatePaginaInstrumentos(res) {
    var page = header
    var keys = ['ID','Nome']
    let result = await axios.get("http://localhost:3000/instrumentos")
    let data = result.data
    page += `
    <table>
    <thead>
    <tr>
    `
    for(let i=0; i< keys.length; i++){
        let h = keys[i]
        page += `<th>${h}</th>`
    }
    page += '</tr></thead>'

    data.forEach(
        i => {
            page += '<tr>'
            page += `<td>${i.id}</td>`
            page += `<td>${i.text}</td>`
            page += '</tr>'
        }
    )

    page += '</table>'
    page += footer
    res.write(page)
    res.end()
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
        generatePaginaAlunos(res);
    }
    else if (myurl == '/cursos') {
        res.writeHead(200,{'Content-Type': 'text/html; charset = utf-8'});
        generatePaginaCursos(res);
    }
    else if (myurl == '/instrumentos') {
        res.writeHead(200,{'Content-Type': 'text/html; charset = utf-8'});
        generatePaginaInstrumentos(res);
    }
    else {
        res.writeHead(200,{'Content-Type': 'text/html; charset = utf-8'});
        res.end('<p>Rota não suportada: ' + req.url + '</p>')
    }
}).listen(4000)

console.log('Servidor à escuta na porta 4000...')