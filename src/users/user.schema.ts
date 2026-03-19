import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true, required: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop()
  name!: string;

  @Prop({ default: [] })
  roles!: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);

// 🔹 скрываем password при JSON-выводе
UserSchema.set('toJSON', {
  transform: (_, ret: Partial<User>) => {
    delete ret.password;
    return ret;
  },
});
