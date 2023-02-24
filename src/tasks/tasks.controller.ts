import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksSercive: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksSercive.getAllTasks();
  }
}
