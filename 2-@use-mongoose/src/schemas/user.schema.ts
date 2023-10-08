import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  validateBeforeSave: true,
})
export class User {
  @Prop()
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  age: number;

  @Prop({ default: now() })
  created_at: Date;

  @Prop({ default: now() })
  updated_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = HydratedDocument<User>;
