import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { TasksController } from './tasks.controller.js';
import { CreateTaskDto } from './dto/create-task.dto.js';

@Module({
  controllers: [TasksController],
  providers: [TasksService, CreateTaskDto],
})
export class TasksModule {}
