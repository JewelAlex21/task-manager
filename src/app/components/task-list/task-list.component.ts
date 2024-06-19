import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  tasks: Task[] = [];
  showToast: boolean = false;
  alerts!:string;
  constructor(private taskService: TaskService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.modalService.modalClosed.subscribe(() => {
      this.loadTasks();
    });
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = this.taskService.getTasks();
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id);
    this.loadTasks();
    this.showToastNotification('Task deleted successfully');
  }

  toggleCompletion(id: string): void {
    this.taskService.toggleTaskCompletion(id);
    this.loadTasks();
    this.showToastNotification('Status updated successfully');
  }

  openModal() {
    this.modalService.showModal();
  }

  private showToastNotification(message:string): void {
    this.showToast = true;
    this.alerts = message;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
}
