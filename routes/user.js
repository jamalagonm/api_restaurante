import express from "express";
import User from "../models/user"
const { verificarAuth, verificarAdministrador } = require("../middlewares/autenticacion");

// Hash Contraseña
const bcrypt = require("bcrypt");
const saltRounds = 10;

// filtrar campos PUT
const _ = require("underscore");

const router = express.Router();

//Post
router.post("/nuevo-usuario", async(req, res) => {
    const body = {
        nombre: req.body.nombre,
        user: req.body.user,
        email: req.body.email,
        role: req.body.role
    };

    body.password = bcrypt.hashSync(req.body.password, saltRounds);

    try {
        const usuarioDB = await User.create(body);
        res.json(usuarioDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: "Ocurrió un error",
            error
        })
    }
});

// PUT usuario
// Se usan dos middlewares, primero severifica el token y luego que usuario sea administrador
router.put("/usuario/:id", [verificarAuth, verificarAdministrador], async(req, res) => {
    const _id = req.params.id;
    //a través de pick de underscore se toma el req.body y se indica los campos los cuales se pueden modificar
    const body = _.pick(req.body, ["nombre", "user", "email", "password", "activo"]);

    if (body.password) {
        body.password = bcrypt.hashSync(req.body.password, saltRounds);
    }

    try {
        const usuarioDB = await User.findByIdAndUpdate(_id, body, {
            new: true,
            runvalidators: true
        });

        return res.json(usuarioDB);

    } catch (error) {
        return res.status(400).json({
            mensaje: "Ocurrió un error",
            error
        })
    }
})

module.exports = router;