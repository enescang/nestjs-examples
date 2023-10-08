import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule, GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { AuthorModule } from './author/author.module';

const graphqlDefinitionsFactory = new GraphQLDefinitionsFactory();
graphqlDefinitionsFactory.generate({
  typePaths: ['./src/graphql/*.graphql'],
  path: join(process.cwd(), 'src/graphql/graphql.definition.ts'),
  outputAs: 'class',
  watch: true,
});

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      typePaths: ['./src/graphql/*.graphql'],
    }),
    AuthorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
