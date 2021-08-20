const { request } = require('express');
const jwt = require('jsonwebtoken');

const verificarAuth = (req, res, next) => {
    // Leer  en headers la variable token
    const token = req.get('token');
    const claveSecreta = "I am a token bitch!"
    jwt.verify(token, claveSecreta, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                mensaje: 'Error de token'
            })
        }
        // Creamos una nueva propiedad con la info del usuario recopilada del token
        req.usuario = decoded.data; //data viene al generar el token en login.js
        next();
    });
}

const verificarAdministrador = (req, res, next) => {
    const rol = req.usuario.role
    if (rol === "ADMIN") {
        next()
    } else {
        return res.status(401).json({
            mensaje: "Usuario NO válido"
        })
    }
}

module.exports = { verificarAuth, verificarAdministrador }