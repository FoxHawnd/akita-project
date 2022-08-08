import { Routes } from '@angular/router';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { HomeComponent } from './home/home.component';

export const ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'add-todo', component: AddTodoComponent}
];
