import { Body, Controller, Post } from '@nestjs/common';
import { InfoService } from './info.service';

@Controller('info')
export class InfoController {
  constructor(private infoService: InfoService) {}

  @Post('/create')
  async createInfo(
    @Body('helloId') helloId: string,
    @Body('email') email: string,
    @Body('backgroundColor') backgroundColor: string, // Thêm tham số email vào phương thức
  ): Promise<any> {
    return this.infoService.createInfoForUser(helloId, email, backgroundColor); // Truyền thêm tham số email vào phương thức createInfo
  }

  @Post('/updateBackground') async updateBackground(
    @Body('helloId') helloId: string,
    @Body('backgroundColor') backgroundColor: string,
  ): Promise<any> {
    return this.infoService.updateBackground(helloId, backgroundColor);
  }
}
