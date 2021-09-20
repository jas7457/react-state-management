/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTodos
// ====================================================

export interface GetTodos_todos {
  __typename: "Todo";
  id: string;
  text: string;
  done: boolean;
}

export interface GetTodos {
  todos: GetTodos_todos[];
}
