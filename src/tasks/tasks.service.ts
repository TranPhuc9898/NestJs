import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';

// import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
// import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private tasksRepository: Repository<Task>,
  ) {}

  async getTaskById(id: any): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(
        `Đéo có người để chịch vui lòng kiếm lại người khác "${id}"`,
      );
    }
    return found;
  }

  // type of tasks là 1 mảng Task
  // private tasks: Task[] = [];
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTaskById(id: string): Task {
  //   const found = this.tasks.find((task) => task.id === id);
  //   if (!found) {
  //     throw new NotFoundException(
  //       `Đéo có người để chịch vui lòng kiếm lại người khác "${id}"`,
  //     );
  //   }
  //   return found;
  // }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    // this.tasks.push(task);
    // return task;
    await this.tasksRepository.save(task);
    return task;
  }
  // deleteTask(id: string): void {
  //   const found = this.getTaskById(id);
  //   // this.tasks sẽ cho ra 1 tasks giá trị mới
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id);
  // }

  // async deleteTask(id: string): Promise<void> {
  //   const result = await this.tasksRepository.delete(id);
  //   console.log(
  //     '%cMyProject%cline:61%cresult',
  //     'color:#fff;background:#ee6f57;padding:3px;border-radius:2px',
  //     'color:#fff;background:#1f3c88;padding:3px;border-radius:2px',
  //     'color:#fff;background:rgb(130, 57, 53);padding:3px;border-radius:2px',
  //     result,
  //   );
  // }
  // updateTaskStatus(id: string, status: TaskStatus) {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
  // getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   return tasks;
  // }
}
