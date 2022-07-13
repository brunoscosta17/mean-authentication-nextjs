import { Task } from './task';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: Task[] = [];

  constructor() { }

  getAll(): Array<Task> {
    const list = window.localStorage.getItem('task-list');
    if (list) {
      this.tasks = JSON.parse(list);
    }
    return this.tasks;
  }

  getById(id: number): any {
    return this.tasks.find((value) => value.id === id);
  }

  save(task: Task): void {
    if(task.id) {
      const taskArray = this.getById(task.id);
      taskArray.description = task.description;
      taskArray.completed = task.completed;
    } else {
      let lastId = 0;
      if (this.tasks.length > 0) {
        lastId = this.tasks[this.tasks.length-1].id;
      }
      task.id = lastId + 1;
      task.completed = false;
      this.tasks.push(task);
    }
    window.localStorage.setItem('task-list', JSON.stringify(this.tasks));
  }

  delete(id: number): void {
    const taskIndex = this.tasks.findIndex((value) => value.id === id);
    this.tasks.splice(taskIndex, 1);
    window.localStorage.setItem('task-list', JSON.stringify(this.tasks));
  }

}
