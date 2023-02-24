import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksSercive: TasksService) {}

  //Get request to /tasks for all tasks
  @Get()
  getTasks(@Query() taskFilterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(taskFilterDto).length) {
      return this.tasksSercive.getTasksWithFilter(taskFilterDto);
    } else {
      return this.tasksSercive.getAllTasks();
    }
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

  // DELETE request to delete a task by ID
  @Delete(':id')
  deleteTask(@Param('id') id: string): { message: string } {
    return this.tasksSercive.deleteTask(id);
  }

  // UPDATE request to update task status by id
  @Patch(':id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') taskStatus: TaskStatus,
  ): Task {
    return this.tasksSercive.updateTaskStatus(id, taskStatus);
  }
}
