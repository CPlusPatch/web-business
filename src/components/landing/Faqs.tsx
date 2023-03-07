import { Disclosure, Transition } from '@headlessui/react';
import nl2br from "react-nl2br";
import PrimaryContainer from '../layout/PrimaryContainer';
import { classNames } from '../../utils/functions';
import { IconChevronDown } from "@tabler/icons-preact";

const faq =  [
	{
		"question": "How did you learn to code?",
		"answer": "I'm a self taught developer, which means I learnt everything I know by being curious and reading docs. I started with Python, HTML and CSS and then moved on to JavaScript.\n\nAfter that, I went on to use PHP + MySQL, which led me to Laravel: I then learnt how to use React + Firebase, which led me to Next.js. In the process, I learnt how to use Git, and how to use JQuery. I also got sick of Bootstrap along the way and found out about TailwindCSS, which I use on everything nowadays"
	},
	{
		"question": "What's your favorite language + framework combination?",
		"answer": "Definitely Next.js + TailwindCSS + Supabase, (Node for backends obviously)."
	},
	{
		"question": "What's your favorite IDE?",
		"answer": "VSCodium, the libre version of Visual Studio Code, is by far the best IDE I have used. It supports every language and framework thanks to extensions, and it has a great UI."
	},
	{
		"question": "What do you do for a living?",
		"answer": "I'm currently a student coding as a side hobby, and learning new things along the way!"
	},
	{
		"question": "What advice would you give to new developers?",
		"answer": "Definitely give Supabase/Firebase a shot, and try to learn as much as you can. Being able to use Codeberg or GitHub for your repositories efficiently is a skill that I think every developer should have: and remember, when you have an issue, the community is always here to help."
	},
	{
		"question": "What's your favorite way to learn?",
		"answer": "I like to learn by doing, so basically thinking of a project and reading docs or guides until I figure it out."
	}
]

export default function Faqs() {
	return (
		<PrimaryContainer>
			<div className="mx-auto max-w-3xl divide-y-2 divide-gray-200">
				<h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-gray-200 sm:text-4xl font-poppins">
					Frequently asked questions
				</h2>
				<dl className="mt-6 space-y-6 divide-y divide-gray-200">
					{faq.map((group) => (
						<Disclosure key={group.question}>
							{({ open }: any) => (
								<div className="pt-6">
									<dt className="text-lg">
										<Disclosure.Button className="flex justify-between items-start w-full text-left text-gray-400 font-inter">
											<span className="font-medium text-gray-900 dark:text-gray-300">
												{nl2br(group.question)}
											</span>
											<span className="flex items-center ml-6 h-7">
												<IconChevronDown
													className={classNames(
														open
															? "-rotate-180"
															: "rotate-0",
														"w-6 h-6 duration-300 ease-in-out transform"
													)}
													aria-hidden="true"
												/>
											</span>
										</Disclosure.Button>
									</dt>
									<Transition
										enter="transition duration-100 ease-out"
										enterFrom="transform scale-95 opacity-0"
										enterTo="transform scale-100 opacity-100"
										leave="transition duration-75 ease-out"
										leaveFrom="transform scale-100 opacity-100"
										leaveTo="transform scale-95 opacity-0">
										<Disclosure.Panel>
											<dd className="pr-12 mt-2">
											<p className="text-base text-gray-500 dark:text-gray-400">
												{nl2br(group.answer)}
											</p>
											</dd>
										</Disclosure.Panel>
									</Transition>
								</div>
							)}
						</Disclosure>
					))}
				</dl>
			</div>
		</PrimaryContainer>
	);
}
