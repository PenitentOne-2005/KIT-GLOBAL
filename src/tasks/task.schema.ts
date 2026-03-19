import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Task extends Document {
  @Prop({ required: true })
  title!: string;

  @Prop()
  description!: string;

  @Prop({ default: 'todo' })
  status!: 'todo' | 'in_progress' | 'done';

  @Prop({ required: true })
  projectId!: string;

  @Prop()
  assigneeId!: string;

  @Prop()
  parentTaskId!: string; // для подзадач

  @Prop([String])
  tags!: string[];

  @Prop()
  deadline!: Date;

  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: { type: [Number], default: [0, 0] },
  })
  location!: { type: 'Point'; coordinates: number[] };
}

// 🔹 Индексы для поиска и GEO
export const TaskSchema = SchemaFactory.createForClass(Task);
TaskSchema.index({ title: 'text', description: 'text' });
TaskSchema.index({ location: '2dsphere' });
