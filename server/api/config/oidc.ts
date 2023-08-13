import { getConfig } from "~/utils/config";

export default defineEventHandler(() => {
	return getConfig().oidc_providers;
});