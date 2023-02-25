import { Taskrepository } from './task.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: Taskrepository) {}
  private tasks: Task[] = [];

  // // Get All Taks
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // // Get filtred Tasks
  // getTasksWithFilter(taskFilterDto: GetTasksFilterDto): Task[] {
  //   let tasks = this.getAllTasks();
  //   const { status, search } = taskFilterDto;

  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }

  //   return tasks;
  // }

  // // Get a task by ID
  // getTaskById(id: string): Task {
  //   const task = this.tasks.find((task) => task.id === id);
  //   // if task not found throw exception
  //   if (!task) {
  //     throw new NotFoundException(`Task with ID ${id} Not Found`);
  //   }
  //   return task;
  // }

  // // Create a new Task
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }

  // // Delete a task by ID
  // deleteTask(id: string): { message: string } {
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id);
  //   return { message: `Task with id : ${id} has been deleted successfully` };
  // }

  // // Update a task'status by id
  // updateTaskStatus(id: string, taskStatus: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = taskStatus;
  //   return task;
  // }
}
