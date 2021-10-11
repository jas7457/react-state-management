import { useState } from 'react';

import useRenderCount from '../hooks/useRenderCount';
import useTodos, { useRemoveTodo, useToggleTodo, useSetTodos } from './hooks/useTodos';

export default function JotaiApp() {
	return (
		<div className="space-y-2">
			<h1>Hello from Jotai App</h1>

			<div className="border border-black">
				<h2>TodoForm</h2>
				<TodoForm />
			</div>

			<div className="border border-black">
				<h2>TodoList</h2>
				<TodoList />
			</div>
		</div>
	);
}

function TodoForm() {
	const renderCount = useRenderCount();

	const setTodos = useSetTodos();
	const [newTodo, setNewTodo] = useState('');

	return (
		<div>
			<div>Render Count: {renderCount}</div>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					setTodos((todos) => [
						...todos,
						{ id: `${new Date().getTime()}`, done: false, text: newTodo }
					]);
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
	const renderCount = useRenderCount();

	const [todos] = useTodos();
	const removeTodo = useRemoveTodo();
	const toggleTodo = useToggleTodo();

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
						<span className={todo.done ? 'line-through' : ''}>{todo.text}</span>
						<button onClick={() => removeTodo(todo.id)}>X</button>
					</li>
				))}
			</ul>
		</div>
	);
}
