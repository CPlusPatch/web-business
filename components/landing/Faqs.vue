<script setup lang="ts">
import PrimaryContainer from "../layout/PrimaryContainer.vue";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { IconChevronDown } from "@tabler/icons-vue";
import { Transition } from "vue";

const faq = [
	{
		question: "How did you learn to code?",
		answer: "I'm a self taught developer, which means I learnt everything I know by being curious and reading docs. I started with Python, HTML and CSS and then moved on to JavaScript.\n\nAfter that, I went on to use PHP + MySQL, which led me to Laravel: I then learnt how to use React + Firebase, which led me to Next.js. In the process, I learnt how to use Git, and how to use JQuery. I also got sick of Bootstrap along the way and found out about TailwindCSS, which I use on everything nowadays.",
	},
	{
		question: "What's your favorite language + framework combination?",
		answer: "Definitely Vue.js + TailwindCSS (with TypeScript), it lets me create so many different things with an easy but powerful syntax!",
	},
	{
		question: "What's your favorite IDE?",
		answer: "VSCodium, the libre version of Visual Studio Code, is by far the best IDE I have used. It supports every language and framework thanks to extensions, and it has a great UI.",
	},
	{
		question: "What do you do for a living?",
		answer: "I'm currently a student coding as a side hobby, and learning new things along the way!",
	},
	{
		question: "What advice would you give to new developers?",
		answer: "Definitely give Supabase/Firebase a shot, and try to learn as much as you can. Being able to use Codeberg or GitHub for your repositories efficiently is a skill that I think every developer should have: and remember, when you have an issue, the community is always here to help.",
	},
	{
		question: "What's your favorite way to learn?",
		answer: "I like to learn by doing, so basically thinking of a project and reading docs or guides until I figure it out.",
	},
];
</script>

<template>
	<PrimaryContainer>
		<div class="mx-auto max-w-3xl flex flex-col gap-y-10">
			<h2
				class="text-3xl font-extrabold text-center text-gray-900 dark:text-gray-200 sm:text-4xl font-poppins">
				Frequently asked questions
			</h2>
			<dl class="gap-y-3 flex flex-col">
				<Disclosure
					:key="group.question"
					v-for="group of faq"
					v-slot="{ open }">
					<div class="px-3 py-4 space-y-3 border-t-2">
						<dt class="text-lg font-poppins">
							<DisclosureButton
								class="flex justify-between items-start w-full text-left text-gray-400 font-inter">
								<span
									class="font-medium text-gray-900 dark:text-gray-300">
									{{ group.question }}
								</span>
								<span class="flex items-center ml-6 h-7">
									<IconChevronDown
										:class="[
											open ? '-rotate-180' : 'rotate-0',
											'w-6 h-6 duration-300 ease-in-out transform',
										]"
										aria-hidden="true" />
								</span>
							</DisclosureButton>
						</dt>
						<transition
							enter-active-class="transition duration-100 ease-in"
							enter-from-class="transform scale-95 opacity-0"
							enter-to-class="transform scale-100 opacity-100"
							leave-active-class="transition duration-75 ease-out"
							leave-from-class="transform scale-100 opacity-100"
							leave-to-class="transform scale-95 opacity-0">
							<DisclosurePanel>
								<dd class="pr-12 mt-2">
									<p
										class="text-base text-gray-600 whitespace-pre-line">
										{{ group.answer }}
									</p>
								</dd>
							</DisclosurePanel>
						</transition>
					</div>
				</Disclosure>
			</dl>
		</div>
	</PrimaryContainer>
</template>
