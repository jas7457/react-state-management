const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const expressPlayground = require('graphql-playground-middleware-express').default;

const schema = buildSchema(`
	"""
	A company that an employee works for
	"""
	type Company {
		id: ID!
		name: String!
		description: String!
		employees: [Employee!]!
	}
	type Employee {
		id: ID!
		name: String!
		"""
		The company this employee works for
		"""
		company: Company!
	}
  type Query {
  	"""
		A way to get employees. Can get all, or by company
		"""
    employees(companyId:ID): [Employee!]!
    
    """
		A way to get all companies
		"""
    companies: [Company!]!
    
    """
		A way to get a specific employee by name
		"""
    employee(name:String!): Employee
    
   """
		A way to get a specific company by name
		"""
    company(name:String, id: ID): Company
  }
  type Mutation {
  	updateEmployee(id: ID!, name:String, companyId: ID): Employee!
  }
`);

const companies = [
	{ id: '1', name: 'Proofpoint', description: 'The best!', employees: ['1', '2'] },
	{ id: '2', name: 'KnowBe4', description: 'The worst', employees: ['3', '4'] },
];

const employees = [
	{ id: '1', name: 'Eleanor Shellstrop', companyId: '1' },
	{ id: '2', name: 'Chidi Anagonye', companyId: '1' },
	{ id: '3', name: 'Shawn', companyId: '2' },
	{ id: '4', name: 'Vicky', companyId: '2' },
];

const employeeMapper = (employee) => {
	const { companyId, ...rest } = employee;
	return { ...rest, company: companies.find((company) => company.id === companyId) };
};

const companyMapper = (company) => {
	return {
		...company,
		employees: company.employees.map((employeeId) => {
			const employee = employees.find((employee) => employee.id === employeeId);
			return employeeMapper(employee);
		}),
	};
};

// The root provides a resolver function for each API endpoint
const root = {
	companies: () => {
		return companies.map(companyMapper);
	},
	employees: ({ companyId }) => {
		return employees
			.filter((employee) => companyId === undefined || employee.companyId === companyId)
			.map(employeeMapper);
	},
	company: ({ name, id }) => {
		const company = companies.find((company) => (name === undefined ? company.id === id : company.name === name));
		return company ? companyMapper(company) : null;
	},
	employee: ({ name }) => {
		const employee = employees.find((employee) => employee.name === name);
		return employee ? employeeMapper(employee) : null;
	},
	updateEmployee: ({ id, ...updates }) => {
		const employeeIndex = employees.findIndex((employee) => employee.id === id);
		employees[employeeIndex] = { ...employees[employeeIndex], ...updates };
		return employeeMapper(employees[employeeIndex]);
	},
};

const app = express();

app.use(cors());

app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		rootValue: root,
		pretty: true,
		graphiql: true,
	})
);

app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

app.listen(4000, (err) => {
	console.log(`Running on port 4000`);
});

//
// {
// 	allEmployees: employees {
// 	name
// 	company {
// 		name
// 		description
// 	}
// }
// 	proofpointEmployees: employees(companyId: 1) {
// 	name
// }
// 	proofpointCompany: company(name: "Proofpoint") {
// 	name
// 	description
// }
// 	eleanorEmployee: employee(name: "Eleanor Shellstrop") {
// 	company {
// 		name
// 	}
// }
// }
