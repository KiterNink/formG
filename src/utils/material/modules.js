export default [
	{
		name: "tInput",
		label: "输入框",
		prop: "el-input",
		config: [
			{ label: "默认值", value: "" },
			{ label: "标签", value: "输入框" },
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
			{ label: "标签", value: "日期选择器" },
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
			{ label: "标签", value: "下拉框" },
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
			{
				label: "下拉字段",
				value: [],
				slot: "el-option",
				type: "select-config",
			},
		],
	},
];
