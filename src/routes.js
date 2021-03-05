const express = require('express');
const routes = express.Router();
const Login = require('./controllers/users_control');

routes.get("/", (req, res) =>{
    return res.json({ok: 'Ok test'});
});

routes.post('/', Login.LoginUser);

module.exports = routes;
