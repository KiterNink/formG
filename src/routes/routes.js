import ConfigPage from "../pages/ConfigPage.vue";
import FormList from "@/templates/FormList.vue";
import ChartAnalysis from "@/templates/ChartAnalysis.vue";
import Custom from "@/templates/Custom.vue";
import Survey from "@/templates/Survey.vue";
export const routes = [
	{
		name: "configPage",
		path: "/",
		component: ConfigPage,
		children: [
			{ name: "formList", path: "formlist", component: FormList },
			{
				name: "chartAnalysis",
				path: "chartAnalysis",
				component: ChartAnalysis,
			},
			{ name: "custom", path: "custom", component: Custom },
			{ name: "survey", path: "survey", component: Survey },
		],
	},
];
