const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const history = require('connect-history-api-fallback');
const mongoose = require("mongoose");

const app = express();

// Conexion a DB
const uri = "mongodb://localhost:27017/contactcenter_2018-30-08";
const options = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true };

// Usando promesas
mongoose.connect(uri, options).then(
    () => { console.log("Conectado a mongoDB") },
    err => { console.log(err); }
);

// Middleware
app.use(morgan("tiny"));

// Uso de CORS
app.use(cors());

// Evitar error de la librería CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    next();
});
app.use(express.json());

//application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

const PORT = 3000;

//Rutas
/*app.get('/', function(req, res) {
    res.send('Hello World!');
});*/

app.use("/api", require("./routes/empleado"));
app.use("/api", require("./routes/user"));
app.use("/api/login", require("./routes/login"));

// Middleware para Vue.js router modo history
app.use(history());
//Para acceder al directorio actual
app.use(express.static(path.join(__dirname, 'public')));

app.set('puerto', process.env.PORT || PORT);
app.listen(app.get('puerto'), function() {
    console.log('Example app listening on port ' + app.get('puerto'));
});