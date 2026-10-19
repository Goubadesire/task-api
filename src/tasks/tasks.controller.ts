import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService, private readonly createTaskDto: CreateTaskDto) {}

  @Get()
  findAll(){
    return this.tasksService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number){
    return this.tasksService.findOne(id)
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto){
    return this.tasksService.create(createTaskDto)
  }
}
