const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    desc: {
      type: String,
      max: 500,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", TodoSchema);
