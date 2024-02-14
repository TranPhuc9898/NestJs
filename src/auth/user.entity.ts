import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  helloId: string;
  @Column()
  username: string;
  @Column()
  password: string;
}
// // Add new fields here
// @Column({ nullable: true })
// phoneNumber: string;
// @Column({ nullable: true })
// favoriteColor: string;
