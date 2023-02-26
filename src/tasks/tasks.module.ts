import { AuthModule } from './../auth/auth.module';
import { Taskrepository } from './task.repository';
import { Task } from './task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthModule],
  controllers: [TasksController],
  providers: [TasksService, Taskrepository],
  // exports : [TasksService , Taskrepository], // add this only if you use service and/or custom repo within another module/service
})
export class TasksModule {}
