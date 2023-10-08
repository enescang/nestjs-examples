import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

@UsePipes(new ValidationPipe())
@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @Post()
    async addPost(@Body() createPostDto: CreatePostDto) {
        return await this.postService.addPost(createPostDto);
    }

    @Get("/all")
    async getAll(){
        return await this.postService.getAllPosts();
    }

}
