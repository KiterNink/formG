export const moduleList = [
	{
		name: "tInput",
		label: "输入框",
		prop: "el-input",
		default: "",
		config: [
			{ label: "占位文字", value: "请输入", prop: "placeholder" },
			{
				label: "是否可清空",
				value: true,
				prop: "clearable",
				type: "radio",
				options: [
					{
						label: "可清空",
						value: true,
					},
					{ label: "不可清空", value: false },
				],
			},
			{
				label: "是否禁用",
				value: false,
				type: "radio",
				prop: "disabled",
				options: [
					{
						label: "禁用",
						value: true,
					},
					{ label: "不禁用", value: false },
				],
			},
		],
	},
	{
		name: "tDatePicker",
		label: "日期选择器",
		prop: "el-date-picker",
		config: [
			{
				label: "是否禁用",
				value: false,
				prop: "disabled",
				type: "radio",
				options: [
					{
						label: "禁用",
						value: true,
					},
					{ label: "不禁用", value: false },
				],
			},
			{
				label: "类型",
				type: "select",
				prop: "type",
				value: "date",
				options: [
					{ label: "年份选择", value: "year" },
					{ label: "月份选择", value: "month" },
					{ label: "日期选择", value: "date" },
					{ label: "周选择", value: "week" },
					{ label: "日期时间", value: "datetime" },
					{ label: "日期时间范围", value: "datetimerange" },
					{ label: "日期范围", value: "daterange" },
				],
			},
		],
	},
	{
		name: "tSelect",
		label: "下拉框",
		prop: "el-select",
		config: [
			{
				label: "是否禁用",
				value: false,
				type: "radio",
				prop: "disabled",
				options: [
					{
						label: "禁用",
						value: true,
					},
					{ label: "不禁用", value: false },
				],
			},
			{
				label: "是否可清空",
				value: true,
				prop: "clearable",
				type: "radio",
				options: [
					{
						label: "可清空",
						value: true,
					},
					{ label: "不可清空", value: false },
				],
			},
			{
				label: "是否多选",
				value: false,
				prop: "multiple",
				type: "radio",
				options: [
					{ label: "多选", value: true },
					{ label: "单选", value: false },
				],
			},
			{
				label: "多选是否折叠标签",
				value: false,
				prop: "collapse-tags",
				type: "radio",
				options: [
					{ label: "折叠", value: true },
					{ label: "不折叠", value: false },
				],
			},
		],
	},
];

export const templateList = [
	{
		label: "过滤搜索",
		value: "formList",
		list: ["tInput", "tDatePicker", "tSelect"],
		tConfig: [
			{
				label: "页头",
				value: "分析页面",
			},
			{
				label: "布局",
				value: "自适应",
				type: "select",
				options: [
					{ label: "三列", value: 3 },
					{ label: "四列", value: 4 },
					{ label: "五列", value: 5 },
					{ label: "自适应", value: "自适应" },
				],
			},
			{
				label: "前置图标",
				type: "image",
				value:
					"data:image/png;base64,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",
			},
			{
				label: "需要导出",
				value: false,
				type: "radio",
				options: [
					{ label: "需要", value: true },
					{ label: "不需要", value: false },
				],
			},
			{
				label: "上下分开",
				value: false,
				type: "radio",
				options: [
					{ label: "分开", value: true },
					{ label: "合并", value: false },
				],
			},
		],
		options: [],
	},
	{
		label: "图表分析页面",
		value: "chartAnalysis",
		list: ["tRadio", "tCheck"],
		tConfig: [],
	},
	{
		label: "问卷调查",
		value: "survey",
		list: ["tInput"],
		tConfig: [
			{ label: "标题", value: "问卷调查" },
			{
				label: "描述",
				value: "为了更好的满足客户需求,进行以下问卷调查,请认真填写内容",
			},
			{ label: "头部海报", value: "", type: "image" },
		],
	},
	{ label: "自定义", value: "custom", list: [], tConfig: [] },
];
