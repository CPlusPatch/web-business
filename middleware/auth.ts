export default defineNuxtRouteMiddleware(async middleware => {
	if (process.client) return;

	if (process.server) {
		const isAdmin = await useFetch<boolean>("/api/user/admin").data.value;

		console.log(isAdmin);

		if (!isAdmin) {
			return navigateTo(
				"/auth/login?" +
					new URLSearchParams({
						next: middleware.fullPath,
					})
			);
		}
	}
});
