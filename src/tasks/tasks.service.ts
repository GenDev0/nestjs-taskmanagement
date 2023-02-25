import { Taskrepository } from './task.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: Taskrepository) {}

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

  // Get a task by ID
  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} Not Found`);
    }
    return found;
  }

  // Create a new Task
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  // Delete a task by ID
  async deleteTask(id: number): Promise<{ message: string }> {
    const result = await this.taskRepository.delete({ id });

    if (result.affected > 0) {
      return { message: `Task with id : ${id} has been deleted successfully` };
    } else {
      throw new NotFoundException(`Task with ID ${id} Not Found`);
    }
  }

  // Update a task'status by id
  async updateTaskStatus(id: number, taskStatus: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = taskStatus;
    await task.save();
    return task;
  }
}
