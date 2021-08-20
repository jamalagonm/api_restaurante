import express from "express";
import Nota from "../models/empleado"
const { verificarAuth, verificarAdministrador } = require("../middlewares/autenticacion");

const router = express.Router();

// Los usuarios solo podrán leer las notas que les pertenecen
// Agregar una nota
router.post('/nuevo-empleado', verificarAuth, async(req, res) => {
    const body = await req.body;
    body.usuarioId = req.usuario._id;
    //console.log(body.usuarioId);

    try {
        const notaDB = await Nota.create(body);
        /*Genero una respuesta de status y adjunto el 
        valor que llego en un json*/
        res.status(200).json(notaDB)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            mensaje: "Ocurrió un error",
            error
        })
    }
});

// Leer base de datos por id
// "_variable" implica campos privados o de uso interno
router.get("/empleado/:id", async(req, res) => {
    const ID = req.params.id;
    try {
        const notaDB = await Nota.findOne({ ID });
        res.json(notaDB);

    } catch (error) {
        return res.status(400).json({
            mensaje: "Ocurrió un error",
            error
        })
    }
});

// Mostrar toda la base de datos
router.get("/empleado", verificarAuth, async(req, res) => {
    const usuarioId = req.usuario._id;
    try {
        // Busca en base de datos solo notas pertenecientes al usuario
        const notaDB = await Nota.find({ usuarioId });
        res.json(notaDB);

    } catch (error) {
        return res.status(400).json({
            mensaje: "Ocurrió un error",
            error
        })
    }
});

// Delete eliminar una nota
router.delete('/empleado/:id', async(req, res) => {
    const ID = req.params.id;
    try {
        const notaDb = await Nota.findByIdAndDelete({ ID });
        if (!notaDb) {
            return res.status(400).json({
                mensaje: 'No se encontró el id indicado',
                error
            })
        }
        res.json(notaDb);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
});

// Put actualizar una nota
router.put('/empleado/:id', async(req, res) => {
    const ID = req.params.id;
    const body = req.body;
    try {
        const notaDb = await Nota.findByIdAndUpdate(
            ID,
            body, { new: true }); //Para enviar la nota actualizada
        res.json(notaDb);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
});


// Exportar router
module.exports = router