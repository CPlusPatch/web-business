import Header from "../layout/Header";
import PrimaryContainer from "../layout/PrimaryContainer";

const scores = [
	{
		name: "cpluspatch.com",
		color: "bg-gradient-to-tr from-emerald-500 to-lime-600",
		desktop: 99,
		mobile: 97,
		fcp: 0.4,
		cls: 0.005,
		tti: 0.5,
	},
	{
		name: "discord.com",
		color: "bg-gradient-to-r from-rose-700 to-pink-600",
		desktop: 77,
		mobile: 40,
		fcp: 2.6,
		cls: 0.036,
		tti: 19.7,
	},
	{
		name: "nytimes.com",
		color: "bg-gradient-to-r from-rose-700 to-pink-600",
		desktop: 53,
		mobile: 29,
		fcp: 4.0,
		cls: 0.031,
		tti: 23.7,
	},
];

export default function LightHouseScores() {
	return (
		<PrimaryContainer size="7xl" className="flex flex-col gap-y-10 items-center">
			<Header type="h1">World-class site performance</Header>
			<p className="text-gray-800 font-inter">
				Measured via a Google Lighthouse test on 12/22/22
			</p>

			{scores.map(score => (
				<div className="flex flex-col w-full font-inter" key={score.name}>
					<a
						href="https://i.imgur.com/IpJk93c.png"
						className="text-sm font-bold text-black uppercase">
						{score.name}
					</a>
					<dl className={"flex-col md:flex-row flex justify-between w-full text-gray-900 font-inter dark:text-white dark:divide-gray-700 text-transparent bg-clip-text " + score.color}>
						<div className="flex flex-col py-3">
							<dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
								Score (Desktop)
							</dt>
							<dd className="text-lg font-semibold">{score.desktop}</dd>
						</div>

						<div className="flex flex-col py-3">
							<dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
								Score (Mobile)
							</dt>
							<dd className="text-lg font-semibold">
								{score.mobile}
							</dd>
						</div>

						<div className="flex flex-col py-3">
							<dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
								FCP
							</dt>
							<dd className="text-lg font-semibold">
								{score.fcp}
							</dd>
						</div>

						<div className="flex flex-col py-3">
							<dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
								CLS
							</dt>
							<dd className="text-lg font-semibold">
								{score.cls}
							</dd>
						</div>

						<div className="flex flex-col py-3">
							<dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
								Time To Interactive
							</dt>
							<dd className="text-lg font-semibold">
								{score.tti}
							</dd>
						</div>
					</dl>
				</div>
			))}
		</PrimaryContainer>
	);
}