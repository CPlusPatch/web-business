export default defineEventHandler(event => {
	return (
		event.node.req.headers.authorization?.split(" ")[1] !==
		process.env.TOKEN
	);
});
