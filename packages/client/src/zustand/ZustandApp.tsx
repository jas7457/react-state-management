import shallow from 'zustand/shallow';
import { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';

import useRenderCount from '../hooks/useRenderCount';
import useTodos from './hooks/useTodos';
import { GetTodos } from '../generated/GetTodos';
import { GetTodosPartial } from '../generated/GetTodosPartial';
import { GetPeople } from '../generated/GetPeople';

const GetPeopleQuery = loader('../graphql/GetPeople.gql');

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
		<div className="space-y-2">
			<h1>Hello from Zustand App</h1>

			<div className="border border-black">
				<h2>TodoForm</h2>
				<TodoForm />
			</div>

			<div className="border border-black">
				<h2>TodoList</h2>
				<TodoList />
			</div>

			<div className="border border-black">
				<h2>TodoListPartial</h2>
				<TodoListPartial />
			</div>

			<div className="border border-black">
				<h2>People</h2>
				<People />
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

const GetTodosPartialQuery = gql`
	query GetTodosPartial {
		todos {
			id
			text
			done
		}
	}
`;

function TodoListPartial() {
	const renderCount = useRenderCount();

	const { data } = useQuery<GetTodosPartial>(GetTodosPartialQuery);

	if (!data) {
		return null;
	}

	return (
		<div>
			<div>Render Count: {renderCount}</div>

			<ul>
				{data.todos.map((todo) => (
					<li key={todo.id}>{todo.text}</li>
				))}
			</ul>
		</div>
	);
}

function People() {
	const renderCount = useRenderCount();

	const { data } = useQuery<GetPeople>(GetPeopleQuery);

	if (!data) {
		return null;
	}

	return (
		<div>
			<div>Render Count: {renderCount}</div>

			<ul>
				{data.people.map((person) => (
					<li key={person.id}>{person.name}</li>
				))}
			</ul>
		</div>
	);
}
