import type { Todo } from '../../types/Todo';
import { atom, useAtom } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';

export const todosAtom = atom<Todo[]>([]);

export default function useTodos() {
	return useAtom(todosAtom);
}

export const useRemoveTodo = () => {
	const setTodos = useUpdateAtom(todosAtom);
	return (id: string) => setTodos((todos) => todos.filter((todo) => todo.id !== id));
};

export const useToggleTodo = () => {
	const setTodos = useUpdateAtom(todosAtom);
	return (id: string) => {
		setTodos((todos) =>
			todos.map((todo) => {
				if (todo.id === id) {
					return { ...todo, done: !todo.done };
				}
				return todo;
			})
		);
	};
};

export const useSetTodos = () => {
	return useUpdateAtom(todosAtom);
};
