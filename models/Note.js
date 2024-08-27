import { model, Schema } from "mongoose";

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  }
}, { timestamps: true });

export default model("Note", noteSchema);
