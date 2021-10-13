import React from 'react';

import DemoCompleted from './DemoCompleted';
import DemoSkeleton from './DemoSkeleton';

export default function App() {
	return (
		<div style={{ display: 'flex' }}>
			<Half>
				<DemoCompleted />
			</Half>
			<Half>
				<DemoSkeleton />
			</Half>
		</div>
	);
}

function Half({ children }: { children: React.ReactNode }) {
	return <div style={{ width: '50%', flexShrink: 0 }}>{children}</div>;
}
