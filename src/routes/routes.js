export const routes = [
	{
		name: "index",
		path: "/",
		component: () => import("../pages/index.vue"),
		redirect: { name: "manage" },
		children: [
			{
				name: "manage",
				path: "manage",
				component: () => import("../pages/Manage.vue"),
			},
			{
				name: "config",
				path: "config",
				component: () => import("../pages/Config.vue"),
			},
			{
				name: "Excel",
				path: "excel",
				component: () => import("@/pages/Excel.vue"),
			},
			{
				name: "Database",
				path: "database",
				component: () => import("@/pages/Database/index.vue"),
			},
			{
				name: "DragCreate",
				path: "dragcreate",
				component: () => import("@/pages/DragCreate.vue"),
			},
			{
				name: "Pages",
				path: "pages",
				component: () => import("../pages/Pages/index.vue"),
			},
		],
	},
];
