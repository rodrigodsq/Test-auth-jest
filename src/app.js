const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const dotenv = require('dotenv');

dotenv.config();
const app = express()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // permissao de controle de acesso para todos* (poderia passar algum http) //
    res.header(
      'Access-Control-Allow-Header',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET'); // tipos de metodos rest que aceita//
      return res.status(200).send({});
    }
    next();
  });

  app.use(routes);

  app.use((req, res, next) => {
    // tratamento de erro//
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
  });
  
  app.use((error, req, res) => {
    // tratamento de erro//
    res.status(error.status || 500);
    return res.send({
      erro: {
        mensagem: error.message,
      },
    });
  });
  
  module.exports = app;