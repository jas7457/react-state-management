import { useState } from 'react';

import ZustandApp from '../zustand/ZustandApp';
import JotaiApp from '../jotai/JotaiApp';
import ValtioApp from '../valtio/ValtioApp';
import MobxApp from '../mobx/MobxApp';

export default function App() {
	const [framework, setFramework] = useState<'zustand' | 'jotai' | 'valtio' | 'mobx' | 'all'>(
		'zustand'
	);

	return (
		<div className="p-8 space-y-16">
			<table className="table-fixed w-full">
				<thead>
					<tr>
						<th className="border border-black">Name</th>
						<th className="border border-black">Latest Version</th>
						<th className="border border-black">Last Release</th>
						<th className="border border-black">Weekly Downloads</th>
						<th className="border border-black">Used by</th>
						<th className="border border-black">Link</th>
					</tr>
				</thead>

				<tbody>
					{stats.map((stat) => (
						<tr key={stat.name}>
							<td className="border border-black">{stat.name}</td>
							<td className="border border-black">{stat.latestVersion}</td>
							<td className="border border-black">
								{stat.lastRelease.toDateString()}
							</td>
							<td className="border border-black">
								{stat.weeklyDownloads.toLocaleString()}
							</td>
							<td className="border border-black">{stat.usedBy.toLocaleString()}</td>
							<td className="border border-black">
								<a href={stat.githubLink} target="_blank" rel="noreferrer">
									{stat.githubLink}
								</a>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<select value={framework} onChange={(e) => setFramework(e.target.value as any)}>
				<option value="zustand">zustand</option>
				<option value="jotai">jotai</option>
				<option value="valtio">valtio</option>
				<option value="mobx">Mobx</option>
				<option value="all">All</option>
			</select>

			{['all', 'zustand'].includes(framework) && <ZustandApp />}
			{['all', 'jotai'].includes(framework) && <JotaiApp />}
			{['all', 'valtio'].includes(framework) && <ValtioApp />}
			{['all', 'mobx'].includes(framework) && <MobxApp />}
		</div>
	);
}

const stats: Array<{
	name: string;
	weeklyDownloads: number;
	latestVersion: string;
	lastRelease: Date;
	usedBy: number;
	githubLink: string;
}> = [
	{
		name: 'zustand',
		weeklyDownloads: 10927,
		latestVersion: '1.2.3',
		lastRelease: new Date('9/4/2021'),
		usedBy: 5900,
		githubLink: 'https://github.com/pmndrs/zustand'
	},
	{
		name: 'jotai',
		weeklyDownloads: 23397,
		latestVersion: '1.3.5',
		lastRelease: new Date('9/17/2021'),
		usedBy: 863,
		githubLink: 'https://github.com/pmndrs/jotai'
	},
	{
		name: 'valtio',
		weeklyDownloads: 134208,
		latestVersion: '3.5.10',
		lastRelease: new Date('9/18/2021'),
		usedBy: 503,
		githubLink: 'https://github.com/pmndrs/valtio'
	},
	{
		name: 'redux',
		weeklyDownloads: 6192927,
		latestVersion: '4.1.1',
		lastRelease: new Date('8/3/2021'),
		usedBy: 1700000,
		githubLink: 'https://github.com/reduxjs/redux'
	},
	{
		name: 'mobx',
		weeklyDownloads: 6192927,
		latestVersion: '4.1.1',
		lastRelease: new Date('8/3/2021'),
		usedBy: 1700000,
		githubLink: 'https://github.com/reduxjs/redux'
	},
	{
		name: 'recoil',
		weeklyDownloads: 6192927,
		latestVersion: '4.1.1',
		lastRelease: new Date('8/3/2021'),
		usedBy: 1700000,
		githubLink: 'https://github.com/reduxjs/redux'
	}
];
