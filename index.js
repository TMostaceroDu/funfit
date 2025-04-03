const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const maquinasApi = require('./rutas/maquinas');
maquinasApi(app);

const usersApi = require('./rutas/personas');
usersApi(app);

app.use(express.static('public'))


var server = app.listen(PORT, () => {
    console.log(`servidor escuchando en ${server.address().port}`)
})

