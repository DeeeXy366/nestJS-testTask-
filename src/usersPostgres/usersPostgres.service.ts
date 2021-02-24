import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersPostgresEntity } from './schemas/usersPostgres.entity';

@Injectable()
export class UsersPostgresService {
  constructor(
    @InjectRepository(UsersPostgresEntity)
    private usersRepository: Repository<UsersPostgresEntity>,
  ) {}

  async getAll(): Promise<UsersPostgresEntity[]> {
    return await this.usersRepository.find();
  }

  async getById(id: string): Promise<UsersPostgresEntity> {
    return await this.usersRepository.findOne(id);
  }

  async create(data): Promise<void> {
    await this.usersRepository.create(data);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
