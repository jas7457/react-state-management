import { proxy } from 'valtio';

import type { Todo } from '../types/Todo';

const state = proxy({
	todos: [] as Todo[],
	addTodo: (text: string) => {
		state.todos.push({ id: `${new Date().getTime()}`, done: false, text });
	},
	person: { name: 'Jason A' }
});
export default state;

// same as on the state, but this is another way to export actions
export const addTodo = (text: string) => {
	debugger;
	state.todos.push({ id: `${new Date().getTime()}`, done: false, text });
};

export const removeTodo = (id: string) => {
	state.todos = state.todos.filter((todo) => todo.id !== id);
};

export const toggleTodo = (id: string) => {
	const todo = state.todos.find((todo) => todo.id === id)!;
	todo.done = !todo.done;
};
