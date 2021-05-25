import Config from "../pages/Config.vue";
import Index from "../pages/index.vue";
import Manage from "../pages/Manage.vue";
import PageMain from "@/pages/PageMain.vue";
import Database from "@/pages/Database/index.vue";
import Excel from "@/pages/Excel.vue";
import DragCreate from "@/pages/DragCreate.vue";
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
			{
				name: "PageMain",
				path: "pagemain",
				component: PageMain,
			},
			{
				name: "Excel",
				path: "excel",
				component: Excel,
			},
			{
				name: "Database",
				path: "database",
				component: Database,
			},
			{
				name: "DragCreate",
				path: "dragcreate",
				component: DragCreate,
			},
		],
	},
];
