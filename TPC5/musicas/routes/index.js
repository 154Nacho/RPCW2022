var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */

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

module.exports = router;
