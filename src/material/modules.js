export default {
	input: {
		name: "DemoInput",
		label: "输入框",
		value: "",
		config: {
			default: {
				label: "默认值",
				value: "",
			},
			label: {
				label: "标签",
				value: "输入框",
			},
			placeholder: {
				label: "占位文字",
				prop: "placeholder",
				value: "请输入",
			},
			clearable: {
				label: "是否可清空",
				prop: "clearable",
				value: true,
				type: "radio",
				options: [
					{
						label: "可清空",
						value: true,
					},
					{ label: "不可清空", value: false },
				],
			},
			isBan: {
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
		},
	},
	"date-picker": {
		name: "DemoDatePicker",
		label: "日期选择器",
		value: "",
		config: {
			label: {
				label: "标签",
				value: "日期选择器",
			},
			isBan: {
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
			type: {
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
		},
	},
	select: {
		name: "DemoSelect",
		label: "下拉框",
		value: "",
		config: {
			default: {
				label: "默认值",
				value: "",
			},
			label: {
				label: "标签",
				value: "下拉框",
			},
			isBan: {
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
			filterable: {
				label: "输入过滤",
				value: true,
				prop: "filterable",
				type: "radio",
				options: [
					{
						label: "可过滤",
						value: true,
					},
					{ label: "不可过滤", value: false },
				],
			},
			clearable: {
				label: "是否可清空",
				prop: "clearable",
				value: true,
				type: "radio",
				options: [
					{
						label: "可清空",
						value: true,
					},
					{ label: "不可清空", value: false },
				],
			},
			multiple: {
				label: "是否多选",
				value: false,
				prop: "multiple",
				type: "radio",
				options: [
					{ label: "多选", value: true },
					{ label: "单选", value: false },
				],
			},
			collapse: {
				label: "多选是否折叠标签",
				value: false,
				prop: "collapse-tags",
				type: "radio",
				options: [
					{ label: "折叠", value: true },
					{ label: "不折叠", value: false },
				],
			},
			remote: {
				label: "是否需要接口过滤",
				value: false,
				prop: "remote",
				type: "radio",
				options: [
					{ label: "需要", value: true },
					{ label: "不需要", value: false },
				],
			},
			remoteUrl: {
				label: "过滤接口路径",
				value: "",
				placeholder: "例如：api/remote/",
			},
			selectConfig: {
				label: "下拉字段",
				value: { type: "custom", list: [] },
				type: "select-config",
			},
			options: [],
		},
	},
};
