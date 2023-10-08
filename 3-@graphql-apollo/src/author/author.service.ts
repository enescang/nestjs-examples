import { Injectable } from '@nestjs/common';
import { Author } from 'src/graphql/graphql.definition';

@Injectable()
export class AuthorService {
  private authors: Author[] = [
    { id: 1, firstName: 'Author1' },
    { id: 2, firstName: 'Author1' },
    { id: 3, firstName: 'Author1' },
  ];

  allAuthors(): Author[] {
    return this.authors;
  }

  getAuthor(id: number): Author {
    const author = this.authors.find((author) => author.id === id);
    return author;
  }
}
