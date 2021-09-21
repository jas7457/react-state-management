import { useState } from 'react';
import { useSnapshot } from 'valtio';

import useRenderCount from '../hooks/useRenderCount';
import store, { addTodo, removeTodo, toggleTodo } from './store';

export default function ValtioApp() {
	return (
		<div className="space-y-2">
			<h1>Hello from Valtio App</h1>

			<div className="border border-black">
				<h2>TodoForm</h2>
				<TodoForm />
			</div>

			<div className="border border-black">
				<h2>TodoList</h2>
				<TodoList />
			</div>

			<div className="border border-black">
				<h2>Person</h2>
				<Person />
			</div>
		</div>
	);
}

function TodoForm() {
	const renderCount = useRenderCount();
	const [newTodo, setNewTodo] = useState('');

	// const snapshot = useSnapshot(store);

	return (
		<div>
			<div>Render Count: {renderCount}</div>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					// store.addTodo(newTodo);
					addTodo(newTodo);
					// snapshot.addTodo(newTodo);
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

	const snapshot = useSnapshot(store);

	return (
		<div>
			<div>Render Count: {renderCount}</div>
			<ul>
				{snapshot.todos.map((todo) => (
					<li key={todo.id}>
						<input
							type="checkbox"
							checked={todo.done}
							onChange={(e) => {
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

function Person() {
	const renderCount = useRenderCount();

	const snapshot = useSnapshot(store);

	return (
		<div>
			<div>Render Count: {renderCount}</div>
			<div>
				{snapshot.person.name}
				<button
					className="ml-4 border border-black"
					onClick={() => {
						store.person.name = store.person.name === 'Jason A' ? 'Jason B' : 'Jason A';
					}}
				>
					Change person
				</button>
			</div>
		</div>
	);
}
