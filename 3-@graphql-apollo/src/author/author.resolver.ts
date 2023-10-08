import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthorService } from './author.service';

@Resolver()
export class AuthorResolver {
  constructor(private authService: AuthorService) {}

  @Query()
  async author(@Args('id') id: number) {
    const author = this.authService.getAuthor(id);
    return author;
  }
}
