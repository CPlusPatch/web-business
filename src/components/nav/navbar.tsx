import NavbarPopover from "./NavbarPopover";
import { Logo } from "./Logo";
import MobileNavbar from "./MobileNavbar";
import { MobileHamburgerMenu } from "./MobileHamburgerMenu";
import { Popover } from "@headlessui/react";
import { IconBrandMatrix, IconFileCode } from "@tabler/icons-preact";
import { useState, useEffect } from "preact/hooks";

export const nav = [
	{
		title: "Home",
		href: "/",
	},
	{
		title: "Skills",
		href: "/#skills",
	},
	{
		title: "Devices",
		href: "https://cpluspatch.com/devices",
	},
	{
		title: "CMS",
		href: "https://cpluspatch.com/blog",
	},
	{
		title: "Projects",
		href: "https://cpluspatch.com/projects",
	},
];

export const services = [
	{
		name: "Matrix",
		description:
			"My personal self-hosted Matrix instance for secure end-to-end encrypted communication",
		href: "https://matrix.cpluspatch.com/_matrix/federation/v1/version",
		icon: <IconBrandMatrix />
	},
];

const Navbar = () => {
	const [shrunk, setShrunk] = useState(false);

	useEffect(() => {
		const handler = () => {
			setShrunk(shrunk => {
				// Shrinks the navbar by toggling shrunk when the user scrolls
				let bst = document.body.scrollTop;
				let est = document.documentElement.scrollTop;

				if (!shrunk && (bst > 20 || est > 20)) return true;

				if (shrunk && bst < 4 && est < 4) return false;

				return shrunk;
			});
		};

		window.addEventListener("scroll", handler, { passive: true });
		return () => window.removeEventListener("scroll", handler);
	}, []);

	return (
		<Popover
			className={`sticky top-0 z-30 backdrop-blur-lg duration-200 bg-white/30 font-poppins`}>
			<div
				className={`flex flex-row justify-between mx-auto max-w-7xl duration-300 ${
					shrunk ? "px-5 py-3" : "p-8"
				}`}>
				<Logo />

				<MobileHamburgerMenu />

				<nav className="hidden justify-center items-center md:flex">
					<ul className="flex flex-row gap-8 justify-between h-100">
						{nav.map((nav) => (
							<li key={nav.title}>
								<a
									href={nav.href}
									className="text-lg text-gray-800">
									{nav.title}
								</a>
							</li>
						))}
						<li>
							<NavbarPopover
								title="Services"
								elements={services}
							/>
						</li>
					</ul>
				</nav>

				<MobileNavbar />

				<a
					href="https://codeberg.org/CPlusPatch/cpluspatch-cms-next"
					className="px-5 py-3 font-inter text-white flex-row gap-x-2 items-center bg-orange-700 rounded-lg shadow-md duration-150 ease-in-out hover:scale-[102%] active:scale-95 hidden md:flex">
					<IconFileCode className="w-4 h-4" />
					Source code
				</a>
			</div>
		</Popover>
	);
};

export default Navbar;
