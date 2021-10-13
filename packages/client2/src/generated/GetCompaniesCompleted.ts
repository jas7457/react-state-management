/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCompaniesCompleted
// ====================================================

export interface GetCompaniesCompleted_companies_employees {
  __typename: "Employee";
  id: string;
  name: string;
}

export interface GetCompaniesCompleted_companies {
  __typename: "Company";
  id: string;
  name: string;
  description: string;
  employees: GetCompaniesCompleted_companies_employees[];
}

export interface GetCompaniesCompleted {
  /**
   * A way to get all companies
   */
  companies: GetCompaniesCompleted_companies[];
}
