import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { TasksController } from './tasks.controller.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';

@Module({
  controllers: [TasksController],
  providers: [TasksService, CreateTaskDto, UpdateTaskDto],
})
export class TasksModule {}
