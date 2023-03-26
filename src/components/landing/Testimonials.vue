<script setup lang="ts">
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/vue';
import PrimaryContainer from '../layout/PrimaryContainer.vue';

const testimonials = [
	{
		name: "Zemi",
		profession: "Computer Science Student",
		text: "CPlusPatch is one of the most skilled and knowledgeable developers I have ever worked with.He is able to take on any task and complete it with ease.He always maintains a positive attitude and a sense of humor, which makes him a joy to work with."
	},
	{
		name: "Kio",
		profession: "Systems Administrator, Hosting Provider",
		text: "CPlusPatch is very intelligent and resourceful when it comes to clear, on-point design. No matter what project he is tasked with, you'll get an honest answer, and a quicker turnaround."
	},
];
</script>

<template>
	<div class="my-10 bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 lg:py-0 lg:z-10 lg:relative">
		<PrimaryContainer>
			<div class="lg:mx-auto lg:max-w-7xl lg:px-8">
				<TabGroup as="div" class="flex flex-col lg:m-0 lg:col-span-2 gap-y-6 duration-200">
					<TabPanels>
						<TabPanel v-for="testi of testimonials">
							<div class="px-4 max-w-md sm:max-w-2xl sm:px-6 lg:px-0 ">
								<blockquote>
									<div>
										<svg class="w-12 h-12 text-white opacity-25" fill="currentColor" viewBox="0 0 32 32"
											aria-hidden="true">
											<path
												d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
										</svg>
										<p class="mt-6 text-2xl font-medium text-white font-inter duration-200">
											{{ testi.text }}
										</p>
									</div>
									<footer class="mt-6">
										<p class="text-base font-medium text-white font-poppins">
											{{ testi.name }}
										</p>
										<p class="text-base font-medium text-indigo-100 font-poppins">
											{{ testi.profession }}
										</p>
									</footer>
								</blockquote>
							</div>
						</TabPanel>
					</TabPanels>

					<TabList class="flex flex-row gap-x-3 justify-center">
						<Tab v-for="testi of testimonials">
							<div class="w-4 h-4 rounded-full border-gray-200 border-2 ring-0">

							</div>
						</Tab>
					</TabList>
				</TabGroup>
			</div>
		</PrimaryContainer>
	</div>
</template>