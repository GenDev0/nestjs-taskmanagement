import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksSercive: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksSercive.getAllTasks();
  }
}
