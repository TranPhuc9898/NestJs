import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Info } from './info.entity';
import { InfoController } from './info.controller';
import { InfoService } from './info.service';
import { User } from 'src/auth/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Info, User])], // Thêm UserRepository vào phạm vi của module
  controllers: [InfoController],
  providers: [InfoService],
})
export class InfoModule {}
