import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TasksService } from './tasks/tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// Bao nhiêu class thì vứt hết vào đây
@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task-management',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],

  controllers: [AppController],
  providers: [AppService, TasksService],
})
export class AppModule {}
