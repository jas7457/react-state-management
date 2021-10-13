import { gql, useQuery } from '@apollo/client';
import { GetCompaniesSkeleton } from '../generated/GetCompaniesSkeleton';

const GetCompaniesQuery = gql`
	query GetCompaniesSkeleton {
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

export default function DemoSkeleton() {
	const { data, loading, error } = useQuery<GetCompaniesSkeleton>(GetCompaniesQuery);

	if (error) {
		return <div>Error: {error}</div>;
	}

	if (loading || !data) {
		return <div>Loading...</div>;
	}

	return (
		<ul>
			{data.companies.map((company) => (
				<li>
					<h1>{company.name}</h1>
					<p>{company.description}</p>
					<ol>
						{company.employees.map((employee) => (
							<li>{employee.name}</li>
						))}
					</ol>
				</li>
			))}
		</ul>
	);
}
