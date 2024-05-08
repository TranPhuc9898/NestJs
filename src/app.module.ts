import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/task.entity';
import { AuthModule } from './auth/auth.module';
import { FacebookModule } from './facebook/facebook.module';
import { ConfigModule } from '@nestjs/config';
import { Token } from './token/token.entity';
import { InfoModule } from './info/info.module';
import { Info } from './info/info.entity';
// Bao nhiêu class thì vứt hết vào đây
@Module({
  imports: [
    TasksModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      entities: [Task, Token, Info],
    }),
    AuthModule,
    FacebookModule,
    InfoModule,
  ],
})
export class AppModule {}
