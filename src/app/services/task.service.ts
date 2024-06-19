import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private storageKey = 'tasks';

  constructor() { }

  getTasks(): Task[] {
    if (this.isLocalStorageAvailable()) {
      const tasksJson = localStorage.getItem(this.storageKey);
      return tasksJson ? JSON.parse(tasksJson) : [];
    }
    return [];
  }

  saveTasks(tasks: Task[]): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    }
  }

  addTask(task: Task): void {
    const tasks = this.getTasks();
    tasks.push(task);
    this.saveTasks(tasks);
  }

  deleteTask(id: string): void {
    let tasks = this.getTasks();
    tasks = tasks.filter(task => task.ID !== id);
    this.saveTasks(tasks);
  }

  toggleTaskCompletion(id: string): void {
    const tasks = this.getTasks();
    const task = tasks.find(task => task.ID === id);
    if (task) {
      task.Status = !task.Status;
      this.saveTasks(tasks);
    }
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = 'test';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }
}
