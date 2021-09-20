import create from 'zustand';

const useTodos = create<{
	todos: Todo[];
	newTodo: string;
	setTodos: (todos: Todo[]) => void;
	setNewTodo: (newTodo: string) => void;
	addTodo: (text: string) => void;
	removeTodo: (id: string) => void;
	toggleTodo: (id: string) => void;
}>((set) => ({
	todos: [],
	newTodo: '',
	setTodos: (todos: Todo[]) => set({ todos }),
	setNewTodo: (newTodo: string) => set(() => ({ newTodo })),
	addTodo: (text: string) =>
		set((state) => ({
			todos: [...state.todos, { id: `${new Date().getTime()}`, done: false, text }]
		})),
	removeTodo: (id: string) =>
		set((state) => ({
			todos: state.todos.filter((todo) => todo.id !== id)
		})),
	toggleTodo: (id: string) =>
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
	id: string;
	text: string;
	done: boolean;
}
