import { createApp } from "vue";
import "./index.css";
import App from "./App.vue";
import Landing from "./pages/Landing.vue";
import { createRouter, createWebHistory } from "vue-router";
import VueTilt from "vue-tilt.js";

const routes = [
	{
		path: "/",
		component: Landing,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes, // short for `routes: routes`,
});

createApp(App)
	.use(router)
	.use(VueTilt)
	.directive("is-visible", {
		mounted: (el, binding) => {
			const options = {
				rootMargin: "0px",
				threshold: 0.25,
			};
			const observer = new IntersectionObserver(entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						const callback = binding.value;
						if (typeof callback === "function") {
							callback();
						}
						observer.unobserve(el);
					}
				});
			}, options);
			observer.observe(el);
		},
	})
	.mount("#app");
