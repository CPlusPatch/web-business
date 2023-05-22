import { Role } from "~/db/entities/User";
import { getUserByToken } from "~/utils/tokens";

export default defineNuxtRouteMiddleware(async () => {
	const cookie = useCookie("token");

	if (process.client) return;

	if (process.server) {
		const user = await getUserByToken(cookie.value ?? "");

		if (user?.role !== Role.ADMIN) {
			return navigateTo("/auth/login");
		}
	}
});
