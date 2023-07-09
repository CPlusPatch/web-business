import { AppDataSource } from "~~/db/data-source";
import { Setting } from "~/db/entities/Setting";

export default defineEventHandler(async event => {
	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}

	const settings = (
		await AppDataSource.getRepository(Setting).findOneBy({
			name: "main"
		})
	)

	if (settings) {
		return settings;
	} else {
		const newSetting = new Setting();

		newSetting.name = "main";
		newSetting.value = {};
		return await AppDataSource.getRepository(Setting).save(newSetting);
	}
});
