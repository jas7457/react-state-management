import { useState } from 'react';

import useRenderCount from '../hooks/useRenderCount';
import useTodos from './hooks/useTodos';

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

	const { addTodo } = useTodos();
	const [newTodo, setNewTodo] = useState('');

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
	const renderCount = useRenderCount();

	const { todos, removeTodo, toggleTodo } = useTodos();

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
