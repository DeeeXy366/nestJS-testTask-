import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { GroupsModule } from './groups/groups.module';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersPostgresModule } from './usersPostgres/usersPostgres.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersPostgresEntity } from './usersPostgres/schemas/usersPostgres.entity';

@Module({
  imports: [
    UserModule,
    GroupsModule,
    UsersPostgresModule,
    MongooseModule.forRoot(
      `mongodb+srv://root:1111@cluster0.lc3rm.mongodb.net/test?retryWrites=true&w=majority`,
    ),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'postgres',
      entities: [UsersPostgresEntity],
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      include: [UserModule, GroupsModule],
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
