import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';

import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { UpdateTaskDto } from './dto/update-tasks.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

import { _ } from 'lodash';
import { DatabaseEmptyException } from './task-empty.exception';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async getTaskById(id: any): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(
        `Đéo có người để ịch cặp mông này xin vui lòng kiếm lại người khác "${id}"`,
      );
    }
    return found;
  }

  async getTasks(): Promise<Task[]> {
    // Tạo query builder
    const query = this.tasksRepository.createQueryBuilder('task');

    // Lấy danh sách các task từ bảng "task"
    const tasks = await query.getMany();

    // Kiểm tra xem có task nào không
    if (tasks.length === 0) {
      // Nếu không có bản ghi nào trong bảng "task", throw ra một custom exception
      throw new DatabaseEmptyException();
    }

    // Nếu có bản ghi trong bảng "task", trả về danh sách các task
    console.log('Tasks found in the database.');
    return tasks;
  }

  // Hàm filterTask
  // type of tasks là 1 mảng Task
  // private tasks: Task[] = [];

  async getTasksFilter(filterDto: GetTasksFilterDto): Promise<Task[]> {
    let query = this.tasksRepository.createQueryBuilder('task');

    if (filterDto.status) {
      query = query.orWhere('task.status = :status', {
        status: filterDto.status,
      });
    }

    if (filterDto.search) {
      query = query.orWhere('task.title LIKE :search', {
        search: `%${filterDto.search}%`,
      });
    }

    const tasks = await query.getMany();

    if (tasks.length === 0) {
      throw new NotFoundException(
        'Không tìm thấy mông bự nào trong database cả',
      );
    }

    return tasks;
  }

  // Hàm kiểm tra filter search
  checkFilterSearch(filterDto: GetTasksFilterDto): void {
    if (_.isEmpty(filterDto.search) || filterDto.search.length < 3) {
      throw new NotFoundException(
        'Cần gõ 3 ký tự chở lên mới kiếm được mông bưs',
      );
    }
  }
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

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Không tìm thấy mông bự này - ID: ${id}`);
    }
  }
  async updateTask(id: string, updateTaskDto: Partial<UpdateTaskDto>) {
    const taskUpdate = await this.getTaskById(id);

    // taskUpdate.status = status;
    Object.assign(taskUpdate, updateTaskDto);
    await this.tasksRepository.save(taskUpdate);
    return taskUpdate;
  }
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
