<script setup lang="ts">
import PrimaryContainer from '../layout/PrimaryContainer.vue';

const scores = [
	{
		name: "cpluspatch.com",
		color: "bg-gradient-to-tr from-emerald-500 to-lime-600",
		desktop: 99,
		mobile: 97,
		fcp: 0.4,
		cls: 0.005,
		tti: 0.5,
	},
	{
		name: "discord.com",
		color: "bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-orange-600 to-orange-500",
		desktop: 77,
		mobile: 40,
		fcp: 2.6,
		cls: 0.036,
		tti: 19.7,
	},
	{
		name: "nytimes.com",
		color: "bg-gradient-to-r from-rose-700 to-pink-600",
		desktop: 53,
		mobile: 29,
		fcp: 4.0,
		cls: 0.031,
		tti: 23.7,
	},
];
</script>

<style scoped lang="postcss">
.score {
	@apply mb-1 text-gray-700 uppercase text-sm;
}
</style>

<template>
	<PrimaryContainer
		class="flex flex-col gap-y-10 items-center">
		<h2
			class="mb-3 text-3xl font-black text-gray-800 font-poppins sm:text-5xl">
			World-class site performance
		</h2>
		<p class="text-gray-800 font-inter">
			Measured via a Google Lighthouse test on 12/22/22
		</p>
		<div
			class="flex flex-col w-full font-inter relative p-3"
			v-for="score of scores"
			:key="score.name">
			<div
				:class="[
					'absolute inset-y-0 left-0 -z-10 rounded',
					score.color,
				]"
				:style="{
					width: `${score.desktop}%`,
				}"></div>
			<a
				href="https://i.imgur.com/IpJk93c.png"
				class="text-sm font-bold text-black uppercase">
				{{ score.name }}
			</a>
			<dl
				:class="[
					'flex-col md:flex-row flex justify-between w-full text-gray-900 font-inter dark:divide-gray-700',
				]">
				<div class="flex flex-col py-3">
					<dt class="score">Score (Desktop)</dt>
					<dd class="text-lg font-semibold">{{ score.desktop }}</dd>
				</div>

				<div class="flex flex-col py-3">
					<dt class="score">Score (Mobile)</dt>
					<dd class="text-lg font-semibold">
						{{ score.mobile }}
					</dd>
				</div>

				<div class="flex flex-col py-3">
					<dt class="score">FCP</dt>
					<dd class="text-lg font-semibold">
						{{ score.fcp }}
					</dd>
				</div>

				<div class="flex flex-col py-3">
					<dt class="score">CLS</dt>
					<dd class="text-lg font-semibold">
						{{ score.cls }}
					</dd>
				</div>

				<div class="flex flex-col py-3">
					<dt class="score">Time To Interactive</dt>
					<dd class="text-lg font-semibold">
						{{ score.tti }}
					</dd>
				</div>
			</dl>
		</div>
	</PrimaryContainer>
</template>
