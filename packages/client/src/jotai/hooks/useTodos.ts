import type { Todo } from '../../types/Todo';
import { atom, useAtom } from 'jotai';

export const todosAtom = atom<Todo[]>([]);

export default function useTodos() {
	const [todos, setTodos] = useAtom(todosAtom);

	return {
		todos,
		addTodo: (text: string) => {
			setTodos([...todos, { id: `${new Date().getTime()}`, done: false, text }]);
		},
		removeTodo: (id: string) => {
			setTodos(todos.filter((todo) => todo.id !== id));
		},
		toggleTodo: (id: string) => {
			setTodos(
				todos.map((todo) => {
					if (todo.id === id) {
						return { ...todo, done: !todo.done };
					}
					return todo;
				})
			);
		}
	};
}
