import express from "express";
import User from "../models/user"

// Hash Contraseña
const bcrypt = require("bcrypt");
const saltRounds = 10;

// json web token
const jwt = require("jsonwebtoken")

const router = express.Router();

router.post("/", async(req, res) => {
    //return res.json({ mensaje: "Login de acceso" })
    const body = req.body;

    try {
        const usuarioDB = await User.findOne({ user: body.user })

        if (usuarioDB) { //Evalua si el usuario existe y si existe su contraseña
            if (bcrypt.compareSync(body.password, usuarioDB.password)) {
                // Generar token
                const claveSecreta = "I am a token bitch!"
                const token = jwt.sign({
                    data: usuarioDB
                }, claveSecreta, { expiresIn: 60 * 60 });

                // Enviar usuario y token en json
                res.json({
                    usuarioDB,
                    token
                });

            } else {
                return res.status(400).json({ mensaje: "Password incorrecto!" })
            }
        } else {
            return res.status(400).json({ mensaje: "User NO existe!" })
        }

    } catch (error) {
        return res.status(400).json({
            mensaje: "Ocurrió un error",
            error
        });
    }
});

module.exports = router