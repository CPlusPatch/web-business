<template>
	<div class="bg-gray-50 font-inter">
		<Navbar />
		<main class="relative overflow-hidden flex min-h-screen flex-col">
			<slot />
			<Footer />
		</main>
	</div>
</template>
