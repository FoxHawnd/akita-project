import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { Observable } from "rxjs";
import { Todo } from "../todo.model";
import { TodoState, ToDoStore } from "./store";

@Injectable({
    providedIn: 'root'
})
export class TodoQuery extends Query<TodoState> {
    constructor(private todoStore: ToDoStore){
        super(todoStore);
    }

    getTodos(): Observable<Todo[]> {
        return this.select(state => state.todos); // le state ici c'est celui qu'on a défini dans le todoState qui contenait todos et isLoaded 
    }

    getLoaded():Observable<boolean> {
        return this.select(state => state.isLoaded)
    }

    getLoading():Observable<boolean> {
        return this.selectLoading();
    }
}