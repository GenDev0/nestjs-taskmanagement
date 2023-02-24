import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksSercive: TasksService) {}

  //Get request to /tasks for all tasks
  @Get()
  getAllTasks(): Task[] {
    return this.tasksSercive.getAllTasks();
  }

  // Get Request to find a task by ID
  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksSercive.getTaskById(id);
  }

  //Post request to /tasks to create a new task
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksSercive.createTask(createTaskDto);
  }
}
