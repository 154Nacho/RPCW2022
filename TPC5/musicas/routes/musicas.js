var express = require('express');
var axios = require('axios');
var router = express.Router();

router.get('/', function(req, res, next) {
    axios.get("http://localhost:3000/musicas")
        .then((response) => {
            var lista = response.data;
            res.render('musicas', {musicas : lista});
        })
        .catch(function (erro) {
            res.render('error', {error: erro})
        });
});

router.get('/insert',function(req,res,next){
    res.render('forms')
});
  
router.post('/',function(req,res,next){
  axios.post("http://localhost:3000/musicas", req.body)
  axios.get("http://localhost:3000/musicas")
      .then(response => {
          let a = response.data
          res.render('musicas',{musicas:a})
      })
      .catch(function(erro){
          res.render('error' , {error : erro})
      })
  });

router.get('/:id', function(req, res, next) {
    var idMusica = req.params.id;
    axios.get("http://localhost:3000/musicas?id=" + idMusica)
      .then((response) => {
        let m = response.data[0];
        res.render('musica', {musica: m})
      })
      .catch(function (erro) {
          res.render('error', {error: erro})
      });
});

router.get('/prov/:prov',function(req,res,next){
    var idProv = req.params.prov
    axios.get("http://localhost:3000/musicas?prov=" + idProv)
        .then( response => {
            let m = response.data
            res.render('provincia',{provincia:m});
        })
        .catch(function(erro){
            res.render('error',{error:erro});
        })
});
module.exports = router;