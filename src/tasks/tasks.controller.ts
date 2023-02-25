import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksSercive: TasksService) {}

  // //Get request to /tasks for all tasks
  // @Get()
  // getTasks(@Query(ValidationPipe) taskFilterDto: GetTasksFilterDto): Task[] {
  //   if (Object.keys(taskFilterDto).length) {
  //     return this.tasksSercive.getTasksWithFilter(taskFilterDto);
  //   } else {
  //     return this.tasksSercive.getAllTasks();
  //   }
  // }

  // Get Request to find a task by ID
  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksSercive.getTaskById(id);
  }

  //Post request to /tasks to create a new task
  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksSercive.createTask(createTaskDto);
  }

  // DELETE request to delete a task by ID
  @Delete(':id')
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return this.tasksSercive.deleteTask(id);
  }

  // // UPDATE request to update task status by id
  // @Patch(':id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body('status', TaskStatusValidationPipe) taskStatus: TaskStatus,
  // ): Task {
  //   return this.tasksSercive.updateTaskStatus(id, taskStatus);
  // }
}
