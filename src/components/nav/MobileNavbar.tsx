import { Popover, Transition } from "@headlessui/react";
import { nav, services } from "./navbar";
import { IconX, IconLink } from "@tabler/icons-preact";
import { Fragment } from "preact/jsx-runtime";
import SmallLogo from "../logo/SmallLogo";

export default function MobileNavbar() {
	return (
		<Transition
			as={Fragment}
			enter="duration-200 ease-out"
			enterFrom="opacity-0 scale-95"
			enterTo="opacity-100 scale-100"
			leave="duration-100 ease-in"
			leaveFrom="opacity-100 scale-100"
			leaveTo="opacity-0 scale-95">
			<Popover.Panel
				focus
				className="absolute inset-x-0 top-0 p-2 transition transform origin-top-right md:hidden">
				<div className="bg-white rounded-lg divide-y-2 divide-gray-50 ring-1 ring-black ring-opacity-5 shadow-lg">
					<div className="px-5 pt-5 pb-6">
						<div className="flex justify-between items-center">
							<div>
								<SmallLogo size="8" />
							</div>
							<div className="-mr-2">
								<Popover.Button className="inline-flex justify-center items-center p-2 text-gray-400 bg-white rounded-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none">
									<span className="sr-only">Close menu</span>
									<IconX className="w-6 h-6" aria-hidden="true" />
								</Popover.Button>
							</div>
						</div>
						<div className="mt-6">
							<nav className="grid gap-y-8">
								{nav.map(item => (
									<a
										key={item.title}
										href={item.href}
										className="flex items-center p-3 -m-3 rounded-md hover:bg-gray-50">
										<IconLink
											className="flex-shrink-0 w-6 h-6 text-orange-600"
											aria-hidden="true"
										/>
										<span className="ml-3 text-base font-medium text-gray-900">
											{item.title}
										</span>
									</a>
								))}
								<hr />
								{services.map(item => (
									<a
										key={item.name}
										href={item.href}
										className="flex items-center p-3 -m-3 rounded-md hover:bg-gray-50">
										{item.icon}
										<span className="ml-3 text-base font-medium text-gray-900">
											{item.name}
										</span>
									</a>
								))}
							</nav>
						</div>
					</div>
				</div>
			</Popover.Panel>
		</Transition>
	);
}
