import { gql, useQuery } from '@apollo/client';
import { GetCompaniesCompleted } from '../generated/GetCompaniesCompleted';

const GetCompaniesQuery = gql`
	query GetCompaniesCompleted {
		companies {
			id
			name
			description
			employees {
				id
				name
			}
		}
	}
`;

export default function DemoCompleted() {
	const { data, loading, error } = useQuery<GetCompaniesCompleted>(GetCompaniesQuery);

	if (error) {
		return <div>Error: {error}</div>;
	}

	if (loading || !data) {
		return <div>Loading...</div>;
	}

	return (
		<ul>
			{data.companies.map((company) => (
				<li key={company.id}>
					<h1>{company.name}</h1>
					<p>{company.description}</p>
					<ol>
						{company.employees.map((employee) => (
							<li key={employee.id}>
								{employee.name} (ID: {employee.id})
							</li>
						))}
					</ol>
				</li>
			))}
		</ul>
	);
}
