import { User } from 'src/auth/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('token')
export class Token {
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' }) // Tên cột tham chiếu đến khóa chính của bảng User
  user: User; // Sử dụng entity User thay vì trực tiếp lấy helloId

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column('timestamp')
  expiryDate: Date;

  @Column({ nullable: true })
  helloId: string;
}
