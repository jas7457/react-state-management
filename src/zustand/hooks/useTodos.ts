import create from 'zustand';

const useTodos = create<{
	todos: Todo[];
	newTodo: string;
	setNewTodo: (newTodo: string) => void;
	addTodo: (text: string) => void;
	removeTodo: (id: number) => void;
	toggleTodo: (id: number) => void;
}>((set) => ({
	todos: [],
	newTodo: '',
	setNewTodo: (newTodo: string) => set(() => ({ newTodo })),
	addTodo: (text: string) =>
		set((state) => ({
			todos: [...state.todos, { id: new Date().getTime(), done: false, text }]
		})),
	removeTodo: (id: number) =>
		set((state) => ({
			todos: state.todos.filter((todo) => todo.id !== id)
		})),
	toggleTodo: (id: number) =>
		set((state) => ({
			todos: state.todos.map((todo) => {
				if (todo.id === id) {
					return { ...todo, done: !todo.done };
				}
				return todo;
			})
		}))
}));

export default useTodos;

interface Todo {
	id: number;
	done: boolean;
	text: string;
}
