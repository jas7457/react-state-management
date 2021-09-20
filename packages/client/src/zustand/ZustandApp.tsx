import shallow from 'zustand/shallow';

import useRenderCount from '../hooks/useRenderCount';
import useTodos from './hooks/useTodos';
import { gql, useQuery } from '@apollo/client';
import { GetTodos } from '../generated/GetTodos';
import { useEffect } from 'react';

const GetTodosQuery = gql`
	query GetTodos {
		todos {
			id
			text
			done
		}
	}
`;

export default function ZustandApp() {
	const { loading, error, data } = useQuery<GetTodos>(GetTodosQuery);

	const setTodos = useTodos((state) => state.setTodos);

	useEffect(() => {
		if (data?.todos) {
			setTodos(data.todos);
		}
	}, [data, setTodos]);

	if (loading) {
		return <>Loading</>;
	}

	if (error) {
		return <>{error.message}</>;
	}

	return (
		<div className="space-y-8">
			<h1>Hello from Zustand App</h1>

			<div>
				<h2>TodoForm</h2>
				<TodoForm />
			</div>

			<div>
				<h2>TodoList</h2>
				<TodoList />
			</div>
		</div>
	);
}

function TodoForm() {
	const { addTodo, newTodo, setNewTodo } = useTodos(
		(state) => ({
			addTodo: state.addTodo,
			newTodo: state.newTodo,
			setNewTodo: state.setNewTodo
		}),
		shallow
	);
	const renderCount = useRenderCount();

	return (
		<div>
			<div>Render Count: {renderCount}</div>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					addTodo(newTodo);
					setNewTodo('');
				}}
			>
				<input
					className="border border-black"
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
				/>
			</form>
		</div>
	);
}

function TodoList() {
	const { todos, removeTodo, toggleTodo } = useTodos(
		(state) => ({
			todos: state.todos,
			removeTodo: state.removeTodo,
			toggleTodo: state.toggleTodo
		}),
		shallow
	);
	const renderCount = useRenderCount();

	return (
		<div>
			<div>Render Count: {renderCount}</div>
			<ul>
				{todos.map((todo) => (
					<li key={todo.id}>
						<input
							type="checkbox"
							checked={todo.done}
							onClick={(e) => {
								toggleTodo(todo.id);
							}}
						/>{' '}
						{todo.text} <button onClick={() => removeTodo(todo.id)}>X</button>
					</li>
				))}
			</ul>
		</div>
	);
}
