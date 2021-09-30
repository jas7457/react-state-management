/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTodosPartial
// ====================================================

export interface GetTodosPartial_todos {
	__typename: 'Todo';
	id: string;
	text: string;
	done: boolean;
}

export interface GetTodosPartial {
	todos: GetTodosPartial_todos[];
}
