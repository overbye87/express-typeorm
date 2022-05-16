import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne,
} from 'typeorm';
import { Role } from './Role';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ nullable: true })
    firstName: string;

  @Column({ nullable: true })
    lastName: string;

  @Column({ nullable: true })
    login: string;

  @Column()
    email: string;

  @Column()
    password: string;

  @ManyToOne(() => Role, (role) => role.users)
    role: Role;
}
