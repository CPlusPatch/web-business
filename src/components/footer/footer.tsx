
import { IconBrandGithub, IconMail, IconBrandStackoverflow, IconCode, IconBrandMatrix } from "@tabler/icons-preact";

const socials = [
	{
		name: "GitHub",
		href: "https://github.com/CPlusPatch",
		icon: <IconBrandGithub size={24} aria-hidden="true" />,
	},
	{
		name: "Codeberg",
		href: "https://codeberg.org/CPlusPatch",
		icon: <IconCode size={24} aria-hidden="true" />,
	},
	{
		name: "E-mail",
		href: "mailto:contact@cpluspatch.com",
		icon: <IconMail size={24} aria-hidden="true" />,
	},
	{
		name: "StackOverflow",
		href: "https://stackoverflow.com/users/12187615/cpluspatch",
		icon: <IconBrandStackoverflow size={24} aria-hidden="true" />,
	},
	{
		name: "Matrix",
		href: "https://matrix.to/#/@jesse:cpluspatch.dev",
		icon: <IconBrandMatrix size={24} aria-hidden="true" />,
	},
];

const Footer = () => {

	return (
		<footer className="">
			<div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:flex md:items-center md:justify-between lg:px-8 font-inter">
				<div
					id="contact"
					className="flex justify-center space-x-6 ring-blue-500 md:order-2 focus:ring-1">
					{socials.map((item) => {
						return (
							<a
								key={item.name}
								href={item.href}
								className="text-gray-400 hover:text-gray-500">
								<span className="sr-only">{item.name}</span>
								{item.icon}
							</a>
						);
					})}
				</div>
				<div className="mt-8 md:mt-0 md:order-1">
					<p className="text-base text-center text-gray-600">
						&copy; {new Date().getFullYear()}{" "}
						Gaspard Wierzbinski. Licensed under GPLv3
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
