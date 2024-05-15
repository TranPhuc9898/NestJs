import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async createInfoForUser(
    helloId: string,
    email: string,
    backgroundColor: string,
  ): Promise<any> {
    // Kiểm tra xem đã tồn tại bản ghi Info với helloId đã cho chưa
    let info = await this.infoRepository.findOne({ where: { helloId } });
    if (info) {
      // Nếu đã tồn tại, cập nhật giá trị email
      info.email = email;
      info.backgroundColor = backgroundColor;
      await this.infoRepository.save(info);
    } else {
      // Nếu chưa tồn tại, tạo mới thông tin (info) cho người dùng đó
      info = this.infoRepository.create({
        helloId,
        email,
        backgroundColor,
        //Thêm các trường khác của thông tin người dùng ở đây
      });
      await this.infoRepository.save(info);
    }
    return info;
  }

  async updateBackground(
    helloId: string,
    backgroundColor: string,
  ): Promise<any> {
    try {
      const infoId = await this.infoRepository.findOne({ where: { helloId } });

      if (infoId) {
        infoId.backgroundColor = backgroundColor;
        await this.infoRepository.save(infoId);
        return { message: 'Background updated successfully' };
      } else {
        throw new HttpException('Info not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(
        'An error occurred while updating the background',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
