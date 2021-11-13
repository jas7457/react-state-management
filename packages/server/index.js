const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
	type Todo {
		id: ID!
		text: String!
		done: Boolean!
	}
	type Person {
		id: ID!
		name: String!
	}
	type Query {
		todos: [Todo!]!
		people: [Person!]!
	}
`;

const resolvers = {
	Query: {
		people: () => [
			{ id: '1', name: 'Jason' },
			{ id: '2', name: 'Matt' },
		],
		todos: () => [
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
		],
	},
};

const app = new ApolloServer({ typeDefs, resolvers });

app.listen(4000).then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});
