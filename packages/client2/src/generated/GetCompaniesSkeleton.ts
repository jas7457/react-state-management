/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCompaniesSkeleton
// ====================================================

export interface GetCompaniesSkeleton_companies_employees {
  __typename: "Employee";
  id: string;
  name: string;
}

export interface GetCompaniesSkeleton_companies {
  __typename: "Company";
  id: string;
  name: string;
  description: string;
  employees: GetCompaniesSkeleton_companies_employees[];
}

export interface GetCompaniesSkeleton {
  /**
   * A way to get all companies
   */
  companies: GetCompaniesSkeleton_companies[];
}
