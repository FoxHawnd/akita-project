import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, switchMap, take } from 'rxjs';
import { ApiService } from '../api.service';
import { TodoQuery } from '../state/query';
import { ToDoStore } from '../state/store';
import { TodoStatus } from '../todo.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  loading = false;
  todos = [];

  constructor(private router: Router, private todoQuery: TodoQuery, private todoStore: ToDoStore, private apiService: ApiService) { }

  ngOnInit(): void {
    this.todoQuery.getLoading().subscribe(res => this.loading = res);
    this.todoQuery.getTodos().subscribe( res => this.todos = res);
    this.todoQuery.getLoaded().pipe(
      take(1),
      filter(res => !res),
      switchMap(() => {
        this.todoStore.setLoading(true);
        return this.apiService.getTodos();
      })
    ).subscribe(res => {
      this.todoStore.update(state => {
        return  {
          todos: res,
          isLoaded: true
        }
      });
      this.todoStore.setLoading(false);
  }, err => {
    console.log(err);
    this.todoStore.setLoading(false);
  }
  )
    this.todoStore.setLoading(false);
  }

  addTodo(){
    this.router.navigateByUrl('/add-todo')
  }

  markAsComplete(id: string){
    this.apiService.updateTodo(id,{status: TodoStatus.DONE}).subscribe(res => {
      this.todoStore.update(state => {
        const todos = [...state.todos];
        const index = todos.findIndex(todo => todo._id === id);
        todos[index] = {
          ...todos[index],
          status: TodoStatus.DONE
        };
        return {
          ...state,
          todos
        }
      });
    }, err => console.log(err)); 
  }

  deleteTodo(id: string){
    this.apiService.deleteTodo(id).subscribe(res => {
      this.todoStore.update(state => {
        return {
          ...state,
          todos: state.todos.filter(t => t._id !== id)
        };
      })
    }, error => console.log(error));
  }
}
