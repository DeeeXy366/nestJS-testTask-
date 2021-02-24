import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'usersPostgres', synchronize: true })
export class UsersPostgresEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
