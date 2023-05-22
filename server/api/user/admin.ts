import { Role } from "~/db/entities/User";
import { getUserByToken } from "~/utils/tokens";

export default defineEventHandler(async event => {
	const cookie = parseCookies(event).token ?? "";

	const user = await getUserByToken(cookie);

	return user?.role !== Role.ADMIN;
});
