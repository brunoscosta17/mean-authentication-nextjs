import { TasksService } from './shared/tasks.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Task } from './shared/task';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  getAll(): Promise<Task[]> {
    return this.tasksService.getAll();
  }
  @Get(':id')
  getById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getById(id);
  }
  @Post()
  async create(@Body() task: Task): Promise<Task> {
    return this.tasksService.create(task);
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() task: Task): Promise<Task> {
    return this.tasksService.update(id, task);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }
}
