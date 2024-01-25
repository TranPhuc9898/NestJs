import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { UpdateTaskDto } from './dto/update-tasks.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')

//* localhost:3000/tasks *//
export class TasksController {
  // 1 class phải có constructor()
  // tasksService là 1 property
  constructor(private tasksService: TasksService) {}

  // When the method call ?
  // @Get() // Phương thức
  // getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getTasksWithFilter(filterDto);
  //   } else {
  //     return this.tasksService.getAllTasks();
  //   }
  // }

  @Get() // Phương thức
  getTasks() {
    return this.tasksService.getTasks();
  }

  @Get('/:GetTaskFilter') // Phương thức
  getTasksFilter(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.getTasksFilter(filterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  // @Get('/:id')
  // getTaskById(@Param('id') id: string): Task {
  //   return this.tasksService.getTaskById(id);
  // }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  // @Post()
  // createTask(
  //   @Body('title') title: string,
  //   @Body('description') description: string,
  // ): Task {
  //   return this.tasksService.createTask(title, description);
  // }

  // @Post()
  // createTask(@Body() CreateTaskDto: CreateTaskDto): Task {
  //   return this.tasksService.createTask(CreateTaskDto);
  // }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  // Này update 1 trường
  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  // ): Promise<Task> {
  //   //  vì updateTaskStatusDto là 1 {} nên khi khai báo biến status
  //   const { status } = updateTaskStatusDto;
  //   return this.tasksService.updateTaskStatus(id, status);
  // }

  /* Này Update tất cả trường trong DTO **/
  @Patch('/:id')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: Partial<UpdateTaskDto>,
  ): Promise<Task> {
    return this.tasksService.updateTask(id, updateTaskDto);
  }
}
