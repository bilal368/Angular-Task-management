import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';

export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent  implements OnInit {
  taskForm: FormGroup;
  tasks: Task[] = [];

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  addTask(): void {
    if (this.taskForm.valid) {
      const newTask: Task = {
        id: Date.now(), // Use a timestamp for a unique id
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        completed: true
      };

      this.tasks.push(newTask);
      this.saveTasks();
      this.taskForm.reset();
    }
  }

  toggleCompletion(task: Task): void {
    task.completed = !task.completed;
    this.saveTasks();
  }

  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.saveTasks();
  }

  saveTasks(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadTasks(): void {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  }
}