const mongoose = require("mongoose");
const { Schema } = mongoose;

const IdeaSchema = new Schema({
  idea: { type: String, required: true },
  description: { type: String },
  upvotes: [{ type: Boolean }],
  downvotes: [{ type: Boolean }],
  author: {
    type: Schema.Types.ObjectID,
    ref: "user",
    required: true,
    autopopulate: true,
  },
  comments: [
    {
      type: Schema.Types.ObjectID,
      ref: "comment",
      required: true,
      autopopulate: true,
    },
  ],
});
IdeaSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("idea", IdeaSchema);
