import { Popover } from "@headlessui/react";
import { IconMenu } from "@tabler/icons-preact";


export function MobileHamburgerMenu() {
	return (
		<div className="ml-auto md:hidden">
			<Popover.Button className="inline-flex justify-center items-center p-2 text-gray-400 rounded-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none">
				<span className="sr-only">Open menu</span>
				<IconMenu className="w-6 h-6" aria-hidden="true" />
			</Popover.Button>
		</div>
	);
}
