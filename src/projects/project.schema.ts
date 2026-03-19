import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Project extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  ownerId: string; // id пользователя, который создал проект

  @Prop({ default: [] })
  members: string[]; // массив id пользователей
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
