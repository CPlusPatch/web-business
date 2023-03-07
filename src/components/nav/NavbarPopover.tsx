import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "preact/jsx-runtime";
import { classNames } from "../../utils/functions";
import { IconChevronDown } from "@tabler/icons-preact";


export default function NavbarPopover({ title, elements }: any) {
	return (
		<Popover className="relative">
			{({ open }: any) => (
				<>
					<Popover.Button
						className={
							"inline-flex items-center text-lg font-medium text-gray-800 rounded-md group hover:text-gray-900 focus:outline-none"
						}>
						<span>{title}</span>
						<IconChevronDown
							className={classNames(
								open
									? "text-gray-900 rotate-180"
									: "text-gray-800",
								"ml-2 w-5 h-5 duration-200"
							)}
							aria-hidden="true"
						/>
					</Popover.Button>

					<Transition
						as={Fragment}
						enter="transition ease-out duration-200"
						enterFrom="opacity-0 translate-y-1"
						enterTo="opacity-100 translate-y-0"
						leave="transition ease-in duration-150"
						leaveFrom="opacity-100 translate-y-0"
						leaveTo="opacity-0 translate-y-1">
						<Popover.Panel className="absolute z-10 px-2 mt-3 -ml-4 w-screen max-w-md transform sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
							<div className="overflow-hidden rounded-lg ring-1 ring-black ring-opacity-5 shadow-lg">
								<div className="grid relative gap-6 px-5 py-6 bg-white sm:gap-8 sm:p-8">
									{elements.map((item: any) => (
										<a
											key={item.name}
											href={item.href}
											className="flex items-start p-3 -m-3 rounded-lg hover:bg-gray-50">
											{item.icon}
											<div className="ml-4">
												<p className="text-base font-medium text-gray-900 font-poppins">
													{item.name}
												</p>
												<p className="mt-1 text-sm text-gray-500">
													{item.description}
												</p>
											</div>
										</a>
									))}
								</div>
							</div>
						</Popover.Panel>
					</Transition>
				</>
			)}
		</Popover>
	);
}