const http = require('http')
const axios = require('axios')
const fs = require('fs')
const static = require('./static.js')
const {parse} = require('querystring')

// Funções auxilidares

// Retrieves student info from request body
function recuperaInfo(request, callback){
    if(request.headers['content-type'] == 'application/x-www-form-urlencoded'){
        let body = ''
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end', ()=>{
            console.log(body)
            callback(parse(body))
        })
    }
}

function generateMainPage(tarefas, d, tarefa) {
    var tarefasRealizadas = []
    var tarefasPorRealizar = []
    tarefas.forEach(t => {
        if (t.status == 'Realizadas') {
            tarefasRealizadas.push(t)
        } else {
            tarefasPorRealizar.push(t)
        }
    })
    let html = `
    <html>
        <head>
            <title>ToDo List</title>
            <meta charset="utf-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
        </head>
        <body>
            <div class="w3-bottombar w3-padding-16">`
            if (JSON.stringify(tarefa) !== '{}'){
                pagHTML += `
                <form class="w3-container" action="/tarefas/${tarefa.id}" method="POST">
                `
            } else {
                pagHTML += `
                <form class="w3-container" action="/tarefas" method="POST">
                `
            }
            pagHTML += `<div class="w3-row-padding">`

                    if (JSON.stringify(tarefa) !== '{}'){
                        pagHTML += `<div class="w3-third">
                        <label class="w3-text-teal"><b>Deadline</b></label>
                        <input class="w3-input w3-border w3-round w3-light-blue" type="date" placeholder="${tarefa.dataLimite}" onfocus="(this.type='date')" onblur="(this.type='text')" name="dataLimite">
                    </div>
                    <div class="w3-third">
                        <label class="w3-text-teal"><b>Criada Por</b></label>
                        <input class="w3-input w3-border w3-round w3-light-blue" type="text" placeholder="${tarefa.autor}" name="autor">
                    </div>
                    <div class="w3-third">
                        <label class="w3-text-teal"><b>Descrição</b></label>
                        <input class="w3-input w3-border w3-round w3-light-blue" type="text" placeholder="${tarefa.descricao}" name="descricao">
                    </div>`
                    } else {
                        pagHTML += `<div class="w3-third">
                        <label class="w3-text-teal"><b>Deadline</b></label>
                        <input class="w3-input w3-border w3-round w3-light-blue" type="date" name="dataLimite" required>
                    </div>
                    <div class="w3-third">
                        <label class="w3-text-teal"><b>Autor</b></label>
                        <input class="w3-input w3-border w3-round w3-light-blue" type="text" name="autor" required>
                    </div>
                    <div class="w3-third">
                        <label class="w3-text-teal"><b>Descrição</b></label>
                        <input class="w3-input w3-border w3-round w3-light-blue" type="text" name="descricao" required>
                    </div>`
                    }

                    pagHTML += `
                    </div>
                    <div class="w3-center w3-margin-top">
                        <input class="w3-btn w3-round-large w3-green" type="submit" value="Registar"/>
                        <input class="w3-btn w3-round-large w3-red" type="reset" value="Limpar Valores"/>
                    </div>
                </form>
            </div>
            <div class="w3-row">
                <div class="w3-col s6">
                    <h2 class="w3-text-teal w3-center">Tarefas Por Realizar</h2>`

if (tarefasPorRealizar.length == 0) {
    pagHTML += '<p class="w3-center">Não há tarefas para mostrar.</p>'
}

tarefasPorRealizadas.forEach(nr => {
    pagHTML += `<div class="w3-container">`
    pagHTML += `<ul class="w3-ul w3-border">`
    pagHTML += `<li>${nr.autor} | ${nr.descricao} | Data limite: ${nr.dataLimite}
                    <a href="http://localhost:4000/tarefas/${nr.id}/editar" class="w3-btn w3-blue w3-round-large w3-padding-small">Editar</a>
                    <a href="http://localhost:4000/tarefas/${nr.id}/done" class="w3-btn w3-green w3-round-large w3-padding-small">Done</a>
                </li>`
    pagHTML += `</ul>`
    pagHTML += `</div>`
})

pagHTML += `
                </div>
                <div class="w3-col s6">
                    <h2 class="w3-text-teal w3-center">Tarefas Realizadas</h2>`

if (tarefasRealizadas.length == 0) {
    pagHTML += '<p class="w3-center">Não há tarefas para mostrar.</p>'
}

tarefasRealizadas.forEach(r => {
    pagHTML += `<div class="w3-container">`
    pagHTML += `<ul class="w3-ul w3-border">`
    pagHTML += `<li>${r.autor} | ${r.descricao} | Data de realização: ${r.dataRealizacao}
                    <a href="http://localhost:4000/tarefas/${r.id}/eliminar" class="w3-btn w3-red w3-round-large w3-padding-small">Eliminar</a>
                </li>`
    pagHTML += `</ul>`
    pagHTML += `</div>`
})

pagHTML += `
                </div>
            </div> 
        </body>
    </html>
    `
    return pagHTML

}
