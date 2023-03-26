import VueTilt from "vue-tilt.js";

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(VueTilt);
})