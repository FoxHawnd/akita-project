import { Injectable } from "@angular/core";
import { Store, StoreConfig } from "@datorama/akita";
import { Todo } from "../todo.model";

export interface TodoState {
    todos: Todo[];
    isLoaded: boolean;
}

export const getInitialState = () => {
    return {
        todos: [],
        isLoaded: false
    }
}

@Injectable({
    providedIn: 'root'
})
@StoreConfig({name: 'todo'})
export class ToDoStore extends Store <TodoState>{
    constructor(){
        super(getInitialState());
    }
}