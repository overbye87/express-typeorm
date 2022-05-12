import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
