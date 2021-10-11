import { observer } from 'mobx-react';
import { useQuery } from '@apollo/client';
import { GetTodos } from '../generated/GetTodos';
import { loader } from 'graphql.macro';
import { useEffect } from 'react';

import useRenderCount from '../hooks/useRenderCount';
import store from './store';

const GetTodosQuery = loader('../graphql/GetTodos.gql');

export default function MobxApp() {
	const { loading, error, data } = useQuery<GetTodos>(GetTodosQuery);

	useEffect(() => {
		if (!data?.todos) {
			return;
		}

		store.todos = data.todos;
	}, [data]);

	if (loading || error) {
		return null;
	}

	return (
		<div className="space-y-2">
			<h1>Hello from Mobx App</h1>

			<div className="border border-black">
				<h2>TodoForm</h2>
				<TodoForm />
			</div>

			<div className="border border-black">
				<h2>TodoList</h2>
				<TodoList />
			</div>

			<div className="border border-black">
				<h2>TodoCounts</h2>
				<TodoCounts />
			</div>

			<div className="border border-black">
				<h2>Person</h2>
				<Person />
			</div>

			<div className="border border-black">
				<h2>PersonName</h2>
				<PersonName />
			</div>

			<div className="border border-black">
				<h2>PersonNumber</h2>
				<PersonNumber />
			</div>

			<div className="border border-black">
				<h2>Store</h2>
				<Store />
			</div>
		</div>
	);
}

const TodoForm = observer(() => {
	const renderCount = useRenderCount();

	return (
		<div>
			<div>Render Count: {renderCount}</div>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					store.addTodo(store.newTodo);
				}}
			>
				<input
					className="border border-black"
					value={store.newTodo}
					onChange={(e) => (store.newTodo = e.target.value)}
				/>
			</form>
		</div>
	);
});

const TodoList = observer(() => {
	const renderCount = useRenderCount();

	return (
		<div>
			<div>Render Count: {renderCount}</div>
			<ul>
				{store.todos.map((todo) => (
					<li key={todo.id}>
						<input
							type="checkbox"
							checked={todo.done}
							onChange={(e) => {
								store.toggleTodo(todo);
							}}
						/>{' '}
						<span className={todo.done ? 'line-through' : ''}>{todo.text}</span>
						<button onClick={() => store.removeTodo(todo)}>X</button>
					</li>
				))}
			</ul>
		</div>
	);
});

const TodoCounts = observer(() => {
	const renderCount = useRenderCount();

	return (
		<div>
			<div>Render Count: {renderCount}</div>
			<div>
				store.counts.completed: {store.counts.completed}, store.counts.remaining:{' '}
				{store.counts.remaining}
			</div>
		</div>
	);
});

const Person = observer(() => {
	const renderCount = useRenderCount();

	return (
		<div>
			<div>Render Count: {renderCount}</div>
			<div>
				store.person.name: {store.person.name}, store.person.count: {store.person.count}
			</div>
		</div>
	);
});

const PersonName = observer(() => {
	const renderCount = useRenderCount();

	return (
		<div>
			<div>Render Count: {renderCount}</div>
			store.person.name:{' '}
			<button
				className="border border-black"
				onClick={() => {
					store.person.name = store.person.name === 'Jason A' ? 'Jason B' : 'Jason A';
				}}
			>
				{store.person.name}
			</button>
		</div>
	);
});

const PersonNumber = observer(() => {
	const renderCount = useRenderCount();

	return (
		<div>
			<div>Render Count: {renderCount}</div>
			store.person.count:{' '}
			<button
				className="border border-black"
				onClick={() => {
					store.person.count++;
				}}
			>
				{store.person.count}
			</button>
		</div>
	);
});

const Store = observer(() => {
	const renderCount = useRenderCount();

	return (
		<div>
			<div>Render Count: {renderCount}</div>
			<pre>{JSON.stringify(store, null, '\t')}</pre>
		</div>
	);
});
