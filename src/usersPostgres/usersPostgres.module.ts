import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersPostgresService } from './usersPostgres.service';
import { UsersPostgresEntity } from './schemas/usersPostgres.entity';
import { UsersPostgresController } from './usersPostgres.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UsersPostgresEntity])],
  providers: [UsersPostgresService],
  controllers: [UsersPostgresController],
})
export class UsersPostgresModule {}
