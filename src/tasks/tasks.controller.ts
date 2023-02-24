import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksSercive: TasksService) {}

  //Get request to /tasks for all tasks
  @Get()
  getAllTasks(): Task[] {
    return this.tasksSercive.getAllTasks();
  }

  //post request to /tasks to create a new task
}
