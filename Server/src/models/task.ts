import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  priority: number;
  category: string;
  completed: boolean;
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  priority: { type: Number, required: false },
  category: { type: String, required: false },
  completed: { type: Boolean, required: true, default: false },
}, {
  timestamps: true // Automatically manage createdAt and updatedAt fields
});

const Task = mongoose.model<ITask>('Task', TaskSchema);

export default Task;