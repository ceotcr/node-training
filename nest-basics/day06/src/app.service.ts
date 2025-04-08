import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private techStack: string[] = ['NestJS', 'TypeScript', 'GraphQL', 'PostgreSQL'];
  getHello(): string {
    return 'Hello World!';
  }
  getTeckStack(): string[] {
    return this.techStack;
  }
}
