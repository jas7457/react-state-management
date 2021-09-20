const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
	type Todo {
		id: ID!
		text: String!
		done: Boolean!
	}
  type Query {
    todos: [Todo!]!
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
	todos: () => {
		return [
			{
				id: '1446412739542',
				text: 'Read emails',
				done: false,
			},
			{
				id: '1446412740883',
				text: 'Buy orange',
				done: true,
			},
		];
	},
};

const app = express();

app.use(cors());

app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		rootValue: root,
		pretty: true,
	})
);

app.listen(4000, (err) => {
	console.log(`Running on port 4000`);
});
