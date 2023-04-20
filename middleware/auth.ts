export default defineNuxtRouteMiddleware(() => {
	const cookie = useCookie("token");

	if (process.server) {
		if (cookie.value !== process.env.TOKEN) {
			return abortNavigation({
				statusCode: 401,
			});
		}
	}
});
