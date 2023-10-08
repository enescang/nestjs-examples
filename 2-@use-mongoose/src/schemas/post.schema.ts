import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, now } from 'mongoose';
import { User } from './user.schema';

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  validateBeforeSave: true,
})
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ ref: User.name })
  author: mongoose.Types.ObjectId;

  @Prop({ default: now() })
  created_at: Date;

  @Prop({ default: now() })
  updated_at: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
export type PostDocument = HydratedDocument<Post>;
