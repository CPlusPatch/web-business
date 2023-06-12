<script setup lang="ts">
import { nanoid } from "nanoid";
import PrimaryContainer from "~/components/layout/PrimaryContainer.vue";
/* const testimonials = [
	{
		id: nanoid(),
		name: "🇨🇦 Kio",
		profession: "Systems Administrator, Hosting Provider",
		avatar: "https://cdn-web.cpluspatch.com/kio_avatar.webp",
		text: "CPlusPatch is very intelligent and resourceful when it comes to clear, on-point design. No matter what project he is tasked with, you'll get an honest answer, and a quicker turnaround.",
	},
	{
		id: nanoid(),
		name: "🇮🇪 Autumn",
		profession: "Engineering Student",
		avatar: "https://cdn-web.cpluspatch.com/autumn_avatar.webp",
		text: "I'm impressed every time I see CPlusPatch working on something. He is extremely dedicated, and always amazes me with the quality and speed of his work. His enthusiasm for his projects is clear every time I talk with him.",
	},
	{
		id: nanoid(),
		name: "🇺🇸 Calciume",
		profession: "Computer Science Student",
		avatar: "https://cdn-web.cpluspatch.com/calciume_avatar.webp",
		text: "I got to be witness to CPlusPatch's development of Fedibase, It really showed me how much he can accomplish when he sticks to a project. He was dedicated enough to make a fully featured Fediverse client that I'd argue is on par with other Fediverse clients, and he did it all on his own.",
	},
	{
		id: nanoid(),
		name: "🇹🇷 Zemi",
		profession: "Computer Science Student",
		avatar: "https://cdn-web.cpluspatch.com/hyper.webp",
		text: "CPlusPatch is one of the most skilled and knowledgeable developers I have ever worked with. He is able to take on any task and complete it with ease. He always maintains a positive attitude and a sense of humor, which makes him a joy to work with.",
	},
	{
		id: nanoid(),
		name: "🇬🇧 Noah",
		profession: "Engineering Student",
		avatar: "https://cdn-web.cpluspatch.com/giggler.webp",
		text: "CPlusPatch is the most talented programmer I have had the pleasure of knowing. He can solve difficult problems using remarkable efficiency and is always happy to assist me with my own projects. Truly a person of all time.",
	},
]; */

defineProps<{
	editable: boolean;
	list?: {
		id: string;
		name: string;
		profession: string;
		avatar: string;
		text: string;
	}[];
}>();

const _prompt = (...props: any[]) => prompt(...props);

const emit = defineEmits(["editField"]);
</script>

<template>
	<PrimaryContainer class="!max-w-[90rem]">
		<div class="lg:m-0 gap-6 duration-200 grid lg:grid-cols-2 grid-cols-1">
			<TemplatesTemplateList
				v-slot="{
					add,
					deleteItem,
					element,
					index,
					moveDown,
					moveUp,
					update,
				}"
				:list="
					list ?? [
						{
							id: nanoid(),
							name: '',
							profession: '',
							text: '',
							avatar: '',
						},
						{
							id: nanoid(),
							name: '',
							profession: '',
							text: '',
							avatar: '',
						},
						{
							id: nanoid(),
							name: '',
							profession: '',
							text: '',
							avatar: '',
						},
						{
							id: nanoid(),
							name: '',
							profession: '',
							text: '',
							avatar: '',
						},
					]
				"
				key-name="id"
				field-name="list"
				@edit-field="(...props) => emit('editField', ...props)">
				<div class="h-full flex flex-col justify-between">
					<div
						class="flex overflow-hidden h-full lg:flex-row flex-col rounded shadow ring-2 ring-gray-200 duration-200 hover:shadow-xl hover:ring-orange-500">
						<div
							class="p-3 lg:w-40 w-full overflow-hidden shrink-0">
							<img
								:contenteditable="editable"
								:src="
									element.avatar === ''
										? 'https://placehold.co/400'
										: element.avatar
								"
								class="w-full rounded h-full object-cover shadow"
								@click="
									editable &&
										update(
											_prompt(
												'Image URL:',
												element.avatar
											),
											index,
											'avatar'
										)
								" />
						</div>
						<div
							class="flex grow flex-col p-3 gap-3 justify-between">
							<p
								class="text-gray-700"
								:contenteditable="editable"
								data-placeholder="Card text"
								@focusout="
									editable &&
										update(
											($event.target as any).innerText,
											index,
											'text'
										)
								">
								{{ element.text }}
							</p>
							<div>
								<h3
									:contenteditable="editable"
									data-placeholder="Card name"
									class="text-black font-semibold text-lg"
									@focusout="
										editable &&
											update(
												($event.target as any)
													.innerText,
												index,
												'name'
											)
									">
									{{ element.name }}
								</h3>
								<h3
									:contenteditable="editable"
									data-placeholder="Card subtitle"
									class="text-transparent bg-clip-text bg-gradient-to-tl from-fuchsia-500 via-red-600 !to-orange-400"
									@focusout="
										editable &&
											update(
												($event.target as any)
													.innerText,
												index,
												'profession'
											)
									">
									{{ element.profession }}
								</h3>
							</div>
						</div>
					</div>
					<div
						v-if="editable"
						class="flex flex-row gap-1 justify-center mt-3 shrink-0">
						<Button
							theme="gray"
							class="!px-1 !py-1 !shadow-md hover:-translate-y-1"
							@click="moveUp(index)">
							<Icon
								name="ic:round-keyboard-arrow-left"
								class="w-6 h-6" />
						</Button>
						<Button
							theme="gray"
							class="!px-1 !py-1 !shadow-md hover:translate-y-1"
							@click="moveDown(index)">
							<Icon
								name="ic:round-keyboard-arrow-right"
								class="w-6 h-6" />
						</Button>

						<Button
							theme="gray"
							class="!px-1 !py-1 !text-red-600 !shadow-md"
							@click="deleteItem(index)">
							<Icon name="ic:round-delete" class="w-6 h-6" />
						</Button>
						<Button
							theme="gray"
							class="!px-1 !py-1 !shadow-md"
							@click="
								add(index, {
									id: nanoid(),
									name: '',
									avatar: '',
									text: '',
									profession: '',
								})
							">
							<Icon name="ic:round-plus" class="w-6 h-6" />
						</Button>
					</div>
				</div>
			</TemplatesTemplateList>
		</div>
	</PrimaryContainer>
</template>
