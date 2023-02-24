import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  // Get All Tasks
  getAllTasks(): Task[] {
    return this.tasks;
  }

  // Get a task by ID
  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);
    return task;
  }

  // Create a new Task
  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
}
