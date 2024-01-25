import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}

export class UpdateTaskDto {
  @IsOptional()
  title?: string;
  @IsOptional()
  description?: string;
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
