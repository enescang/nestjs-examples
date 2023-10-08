import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  secretMessage(): string {
    return "This is a secret route. Guard is around us!";
  }
}
