const mongoose = require("mongoose");
const { Schema } = mongoose;

const { compareSync, hashSync, genSaltSync } = require("bcryptjs");

const UserSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

//middleware para hacer algo antes de responder a los get, en este caso queremos eliminar la propiedad password
UserSchema.methods.toJSON = function () {
  let user = this.toObject();
  delete user.password;
  return user;
};

//middleware para comprar las password la que llega en el request y la que tenemos en BD
UserSchema.methods.comparePassword = function (password) {
  return compareSync(password, this.password);
};

//middleware para cifrar la contrasena antes de guardar en la BD
UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  const salt = genSaltSync(10);
  const hashedPassword = hashSync(user.password, salt);
  user.password = hashedPassword;
  next();
});

module.exports = mongoose.model("user", UserSchema);
