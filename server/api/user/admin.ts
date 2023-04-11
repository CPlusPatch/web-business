export default defineEventHandler(event => {
	const cookie = parseCookies(event).token ?? "";

	return cookie === process.env.TOKEN;
});
