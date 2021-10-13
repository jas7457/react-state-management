import { Todo } from '../types/Todo';
import { makeAutoObservable } from 'mobx';

class Store {
	todos: Todo[] = [];
	person: { name: string; count: number } = { name: 'Jason A', count: 0 };
	newTodo = '';

	constructor() {
		makeAutoObservable(this);
	}

	addTodo(text: string) {
		debugger;
		this.todos.push({ id: `${new Date().getTime()}`, done: false, text });
		this.newTodo = '';
	}

	removeTodo(todo: Todo) {
		this.todos.splice(this.todos.indexOf(todo), 1);
	}

	toggleTodo(todo: Todo) {
		todo.done = !todo.done;
	}

	get counts() {
		return this.todos.reduce(
			(memo, todo) => {
				if (todo.done) {
					return { ...memo, completed: memo.completed + 1 };
				}

				return { ...memo, remaining: memo.remaining + 1 };
			},
			{ completed: 0, remaining: 0 }
		);
	}
}
const store = new Store();

const store2 = makeAutoObservable({
	todos: [] as Todo[],
	person: { name: 'Jason A', count: 0 },
	newTodo: '',
	addTodo(text: string) {
		debugger;
		this.todos.push({ id: `${new Date().getTime()}`, done: false, text });
		this.newTodo = '';
	},

	removeTodo(todo: Todo) {
		this.todos.splice(this.todos.indexOf(todo), 1);
	},

	toggleTodo(todo: Todo) {
		todo.done = !todo.done;
	},

	get counts() {
		return this.todos.reduce(
			(memo: { completed: number; remaining: number }, todo: Todo) => {
				if (todo.done) {
					return { ...memo, completed: memo.completed + 1 };
				}

				return { ...memo, remaining: memo.remaining + 1 };
			},
			{ completed: 0, remaining: 0 }
		);
	}
});

export default store;
