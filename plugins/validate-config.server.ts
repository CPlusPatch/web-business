export default defineNuxtPlugin(nuxtApp => {
	/* nuxtApp.hook("app:created", _ => {
		try {
			const config = getConfig();

			if (!config) {
				throw new Error(
					"Your config.toml is invalid or does not exist!"
				);
			}
		} catch (err) {
			console.error(err);

			throw new Error("Your config.toml is invalid or does not exist!");
		}
	}) */
});