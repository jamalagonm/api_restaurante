import mongoose from "mongoose";
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const reputacion = {
    values: [1, 2, 3, 4, 5],
    message: "{VALUE} Valor no válido"
}

const empleadoSchema = new Schema({
    ID: { type: String, required: [true, "id Obligatorio"], unique: true },
    nombre_persona: { type: String, required: [true, "Nombre Obligatorio"], unique: true },    
    salario: Number,
    date: { type: Date, default: Date.now },
    activo: { type: Boolean, default: true },
    usuarioId: String,
    estrellas: {type: Number, enum: reputacion}
});

empleadoSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

// Convertir a modelo
const empleado = mongoose.model('empleado', empleadoSchema);

export default empleado