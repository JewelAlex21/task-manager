import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../../models/task';
import { ModalService } from '../../services/modal.service';
@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.scss'
})
export class TaskEditComponent {
  taskForm!: FormGroup;
  isVisible = false;
  constructor(private fb: FormBuilder, private taskService: TaskService,private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.modalService.modalVisibility.subscribe(isVisible => {
      this.isVisible = isVisible;
      this.taskForm = this.fb.group({
        Title: ['', Validators.required],
        Description: ['']
      });    
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const newTask: Task = {
        ID: uuidv4(),
        Title: this.taskForm.value.Title,
        Description: this.taskForm.value.Description,
        Status: false
      };
      this.taskService.addTask(newTask);
      this.taskForm.reset();
      this.taskService.getTasks();
      this.modalService.hideModal();
    }else {
      this.taskForm.markAllAsTouched();
    }
  }

  closeModal() {
    this.modalService.hideModal();
  }
}
