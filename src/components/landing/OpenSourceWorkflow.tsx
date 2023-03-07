import Tilt from "react-parallax-tilt";
import Header from "../layout/Header";
import PrimaryContainer from "../layout/PrimaryContainer";

const software = [
	{
		name: "",
		img: "/static/stack/python.webp",
	},
	{
		name: "",
		img: "/static/stack/document.webp",
	},
	{
		name: "",
		img: "/static/stack/folder.webp",
	},
	{
		name: "",
		img: "/static/stack/keyboard.webp",
	},
	{
		name: "",
		img: "/static/stack/console.webp",
	},
	{
		name: "",
		img: "/static/stack/picture.webp",
	},
];

const StackPresentation = () => {
	return (
		<PrimaryContainer className="flex flex-row items-center">
			<div className="flex relative z-20 flex-col gap-y-4 sm:w-2/3 lg:w-2/5">
				<Header type="h1">Open-source workflow</Header>

				<p className="text-xl text-gray-500 font-inter">
					I use open-source and libre sofware as part of my
					development workflow. This includes:
				</p>

				<ul className="space-y-1 max-w-md list-disc list-inside font-inter font-semibold">
					<li>VSCodium</li>
					<li>Ubuntu LTS-based Linux/Arch</li>
					<li>LibreWolf Browser</li>
					<li>Codeberg.org</li>
					<li>GPLv3 license</li>
				</ul>
			</div>
			<div className="hidden relative grid-cols-3 grid-rows-2 gap-3 ml-auto sm:w-1/3 lg:w-1/2 sm:grid">
				{software.map((app) => (
					<>
					{/* @ts-ignore */}
					<Tilt
						key={app.name}
						className="flex overflow-hidden justify-center items-center md:max-w-xl"
						tiltMaxAngleX={2}
						tiltMaxAngleY={2}>
						<img
							src={app.img}
							className="p-2 w-full rounded-md"
							alt={app.name}
							width={150}
							height={150}
						/>
					</Tilt>
					</>
				))}
			</div>
		</PrimaryContainer>
	);
};

export default StackPresentation;
