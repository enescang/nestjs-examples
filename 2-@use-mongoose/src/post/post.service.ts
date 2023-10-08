import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from 'src/schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async addPost(createPostDto: CreatePostDto): Promise<PostDocument> {
    const post = new this.postModel(createPostDto);
    await post.save();
    return post;
  }

  async getAllPosts(){
    const posts = await this.postModel.find({}).populate("author");
    return posts;
  }
}
