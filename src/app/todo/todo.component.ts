import { Component, OnInit } from '@angular/core';

interface Task {
  text: string;
  priority: 'Low' | 'Medium' | 'High';
  completed: boolean;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  tasks: Task[] = [];
  newTask: string = '';
  newPriority: 'Low' | 'Medium' | 'High' = 'Medium';
  editIndex: number | null = null;

  constructor() {}

  ngOnInit(): void {
    this.loadTasks();
  }

  addOrUpdateTask(): void {
    if (this.newTask.trim()) {
      if (this.editIndex !== null) {
        // Edit existing task
        this.tasks[this.editIndex].text = this.newTask.trim();
        this.tasks[this.editIndex].priority = this.newPriority;
        this.editIndex = null;
      } else {
        // Add new task
        this.tasks.push({
          text: this.newTask.trim(),
          priority: this.newPriority,
          completed: false,
        });
      }
      this.newTask = '';
      this.newPriority = 'Medium';
      this.saveTasks();
    }
  }

  editTask(index: number): void {
    this.newTask = this.tasks[index].text;
    this.newPriority = this.tasks[index].priority;
    this.editIndex = index;
  }

  toggleCompletion(index: number): void {
    this.tasks[index].completed = !this.tasks[index].completed;
    this.saveTasks();
  }

  removeTask(index: number): void {
    this.tasks.splice(index, 1);
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
