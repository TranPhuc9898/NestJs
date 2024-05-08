import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Info } from './info.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class InfoService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Info)
    private infoRepository: Repository<Info>,
  ) {}

  async createInfoForUser(helloId: string, email: string): Promise<any> {
    // Kiểm tra xem đã tồn tại bản ghi Info với helloId đã cho chưa
    let info = await this.infoRepository.findOne({ where: { helloId } });
    if (info) {
      // Nếu đã tồn tại, cập nhật giá trị email
      info.email = email;
      await this.infoRepository.save(info);
    } else {
      // Nếu chưa tồn tại, tạo mới thông tin (info) cho người dùng đó
      info = this.infoRepository.create({
        helloId,
        email,
        //Thêm các trường khác của thông tin người dùng ở đây
      });
      await this.infoRepository.save(info);
    }
    return info;
  }
}
