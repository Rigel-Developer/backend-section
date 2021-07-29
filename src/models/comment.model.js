const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentSchema = new Schema({
  comment: { type: String, required: true },
  description: { type: String },
  author: {
    type: Schema.Types.ObjectID,
    ref: "user",
    required: true,
    autopopulate: true, //nos permite traer la relacion
  },
});

//se importa este paquete que nos permite traer la relacion al momento de realizar un get
CommentSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("comment", CommentSchema);
