import { model, Schema } from 'mongoose';

const TaskSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export default model('Task', TaskSchema);
