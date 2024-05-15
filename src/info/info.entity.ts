import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Info {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  helloId: string;

  @Column({ nullable: true }) // Đặt cột "email" là có thể null
  email: string;

  @Column({ nullable: true })
  backgroundColor: string;
  // hoặc bạn có thể chỉ định kiểu dữ liệu của "email" là string | null
  //Thêm các trường khác của thông tin người dùng ở đây
  // Ví dụ:
  // @Column()
  // email: string;
}
