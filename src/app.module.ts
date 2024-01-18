import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TasksService } from './tasks/tasks.service';

// Bao nhiêu class thì vứt hết vào đây
@Module({
  imports: [TasksModule],
  controllers: [AppController],
  providers: [AppService, TasksService],
})
export class AppModule {}
