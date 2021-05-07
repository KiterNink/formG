import Config from "../pages/Config.vue";
import Index from "../pages/index.vue";
import Manage from "../pages/Manage.vue";
export const routes = [
	{
		name: "index",
		path: "/",
		component: Index,
		redirect: { name: "manage" },
		children: [
			{
				name: "manage",
				path: "manage",
				component: Manage,
			},
			{
				name: "config",
				path: "config",
				component: Config,
			},
		],
	},
];
