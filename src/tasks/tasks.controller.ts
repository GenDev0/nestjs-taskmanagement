import { GetUser } from './../auth/get-user.decorator';
import { User } from './../auth/user.entity';
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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksService } from './tasks.service';

import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private readonly tasksSercive: TasksService) {}

  //Get request to /tasks for all tasks : Task[]
  @Get()
  getTasks(
    @Query(ValidationPipe)
    taskFilterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksSercive.getTasks(taskFilterDto, user);
  }

  // Get Request to find a task by ID
  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksSercive.getTaskById(id);
  }

  //Post request to /tasks to create a new task
  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksSercive.createTask(createTaskDto, user);
  }

  // DELETE request to delete a task by ID
  @Delete(':id')
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return this.tasksSercive.deleteTask(id);
  }

  // UPDATE request to update task status by id
  @Patch(':id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) taskStatus: TaskStatus,
  ): Promise<Task> {
    return this.tasksSercive.updateTaskStatus(id, taskStatus);
  }
}
