import PrimaryContainer from "../layout/PrimaryContainer";
import Header from "../layout/Header";
import { IconDots } from "@tabler/icons-preact";

const languages = [
	{
		name: "TypeScript",
		type: "Language",
		experience: "One year",
		image: "languages/typescript.webp",
		progress: 0.9,
	},
	{
		name: "JavaScript",
		type: "Language",
		experience: "Five years",
		image: "languages/javascript.webp",
		progress: 1.0,
	},
	{
		name: "React",
		type: "Framework",
		experience: "Two years",
		image: "languages/react.webp",
		progress: 0.8,
	},
	{
		name: "Next.js",
		type: "Framework",
		experience: "One year",
		image: "languages/nextjs.webp",
		progress: 0.8,
	},
	{
		name: "CSS",
		type: "Language",
		experience: "Seven years",
		image: "languages/css.webp",
		progress: 0.8,
	},
	{
		name: "HTML",
		type: "Language",
		experience: "Seven years",
		image: "languages/html.webp",
		progress: 1.0,
	},
	{
		name: "Firebase",
		type: "Framework",
		experience: "One year",
		image: "languages/firebase.webp",
		progress: 0.6,
	},
	{
		name: "Supabase",
		type: "Framework",
		experience: "One year",
		image: "languages/supabase.webp",
		progress: 0.6,
	},
	{
		name: "Node.js",
		type: "Runtime",
		experience: "Three years",
		image: "languages/npm.webp",
		progress: 0.8,
	},
	{
		name: "TailwindCSS",
		type: "Framework",
		experience: "Two years",
		image: "languages/tailwindcss.jpg",
		progress: 1.0,
	},
	{
		name: "Unreal Engine",
		type: "Language",
		experience: "Five years",
		image: "languages/unreal.webp",
		progress: 0.2,
	},
	{
		name: "Github",
		type: "Repository",
		experience: "Four years",
		image: "languages/github.jpg",
		progress: 0.9,
	},
	{
		name: "Codeberg",
		type: "Repository",
		experience: "Recent",
		image: "languages/codeberg.webp",
		progress: 1.0,
	},
	{
		name: "Python",
		type: "Language",
		experience: "Seven years",
		image: "languages/python.webp",
		progress: 0.9,
	},
	{
		name: "Discord.js",
		type: "Framework",
		experience: "One year",
		image: "languages/discord.webp",
		progress: 0.6,
	},
	{
		name: "PHP",
		type: "Language",
		experience: "Four years",
		image: "languages/php.webp",
		progress: 0.5,
	},
	{
		name: "Laravel",
		type: "Framework",
		experience: "Two years",
		image: "languages/laravel.webp",
		progress: 0.4,
	},
	{
		name: "Git",
		type: "Tool",
		experience: "Four years",
		image: "languages/git.webp",
		progress: 0.8,
	},
	{
		name: "Vite",
		type: "Framework",
		experience: "One year",
		image: "languages/vite.webp",
		progress: 0.5,
	},
	{
		name: "Docker",
		type: "Framework",
		experience: "Recent",
		image: "languages/docker.webp",
		progress: 0.3,
	},
	{
		name: "Preact",
		type: "Framework",
		experience: "Recent",
		image: "languages/preact.webp",
		progress: 0.9,
	},
	{
		name: "Redux",
		type: "Library",
		experience: "Recent",
		image: "languages/redux.webp",
		progress: 0.2,
	},
	{
		name: "Raspberry Pi",
		type: "Hardware",
		experience: "Seven years",
		image: "languages/raspberrypi.webp",
		progress: 1.0,
	},
	{
		name: "Arduino",
		type: "Hardware",
		experience: "Seven years",
		image: "languages/arduino.webp",
		progress: 0.4,
	},
	{
		name: "JQuery",
		type: "Framework",
		experience: "Four years",
		image: "languages/jquery.webp",
		progress: 0.5,
	},
	{
		name: "Rust",
		type: "Language",
		experience: "Recent",
		image: "languages/rust.webp",
		progress: 0.2,
	},
];

languages.sort((a, b) => b.progress - a.progress);

export default function Skills() {
	return (
		<PrimaryContainer id="skills">
			<div className="space-y-12">
				<div className="space-y-5 sm:space-y-4">
					<Header type="h2">Languages & Frameworks</Header>
					<p className="text-xl text-gray-500 dark:text-gray-300 font-inter">
						My experience with several different programming languages, frameworks, and
						libraries. Skill in any may vary from project to project.
					</p>
				</div>
			</div>
			<ul
				role="list"
				className="grid grid-cols-1 gap-5 mt-12 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 font-inter">
				{languages.map(language => (
					<li
						key={language.name}
						className="flex overflow-hidden col-span-1 rounded-md shadow-sm duration-200 hover:scale-[102%] hover:rotate-1">
						<div className="flex overflow-hidden flex-shrink-0 justify-center items-center w-20 h-full text-sm font-medium text-white rounded-l-md border sm:w-24">
							<img
								className="object-cover rounded-sm duration-150 aspect-1"
								src={`/static/${language.image}`}
								alt=""
								placeholder="blur"
							/>
						</div>
						<div className="flex relative flex-col flex-1 justify-between items-start truncate bg-white rounded-r-md border-t border-r border-b border-gray-200">
							<div className="flex-1 px-4 py-2 text-sm truncate">
								<a href="#" className="text-lg font-bold text-gray-900">
									{language.name}
								</a>
								<p className="text-gray-500">{language.experience}</p>
							</div>
							<div className="flex absolute inset-x-0 bottom-0 flex-col mt-auto w-full">
								<span className="px-1 ml-auto text-sm text-gray-600 rounded-tl-md border-t border-l font-inter">
									{language.progress * 100}%
								</span>
								<div className="h-2 bg-gray-200">
									<div
										style={{
											width: `${language.progress * 100}%`,
										}}
										className="h-full bg-red-700 bg-gradient-to-r from-yellow-600 to-red-600"></div>
								</div>
							</div>
						</div>
					</li>
				))}
				<li className="flex overflow-hidden col-span-1 rounded-md shadow-sm">
					<div className="flex overflow-hidden flex-shrink-0 justify-center items-center w-24 h-full text-sm font-medium text-white rounded-l-md border">
						<IconDots className="w-10 h-auto text-black" />
					</div>
					<div className="flex flex-1 justify-between items-start truncate bg-white rounded-r-md border-t border-r border-b border-gray-200">
						<div className="flex-1 px-4 py-2 text-sm truncate">
							<a href="#" className="text-lg font-bold text-gray-900">
								And more!
							</a>
							<p className="text-gray-500">Forever</p>
						</div>
					</div>
				</li>
			</ul>
		</PrimaryContainer>
	);
}
