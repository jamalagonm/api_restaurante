import mongoose from "mongoose";
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const roles = {
    values: ["ADMIN", "USER"],
    message: "{VALUE} Rol no válido"
}

const userSchema = new Schema({
    nombre: { type: String, required: [true, "Nombre Obligatorio"], unique: true },
    user: { type: String, required: [true, "Nombre Obligatorio"], unique: true },
    email: { type: String, required: [true, "Email Obligatorio"], unique: true },
    password: { type: String, required: [true, "Password Obligatorio"] },
    date: { type: Date, default: Date.now },
    role: { type: String, default: "ADMIN", enum: roles },
    activo: { type: Boolean, default: true }
});

userSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

// Eliminar password de respuesta JSON
userSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
}


const User = mongoose.model("User", userSchema);

export default User;