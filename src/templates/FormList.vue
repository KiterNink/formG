<template>
	<div class="form-list-container">
		<div class="common-card form-wrap">
			<div class="common-card-header common-space">
				<div class="left">
					<img :src="icon" alt="" class="icon-title-pre" />
					<p class="title">{{ title }}</p>
				</div>
			</div>
			<div class="form-body">
				<custom-drag
					v-model="formList"
					class="form-list"
					custom-class="form-item"
					item-key="id"
					group="module"
					@handleClick="handleClick"
				>
					<template #default="{ element }">
						<p class="item-label">{{ element.label }}:</p>
						<div class="item-content">
							<component
								:is="getComponent(element.prop)"
								style="width: 170px"
							></component>
						</div>
					</template>
					<template #footer>
						<i
							class="zhanweifu"
							v-for="_ in formList.length"
							:key="_"
						></i>
					</template>
				</custom-drag>
				<div class="form-button-group">
					<el-button size="small">重置</el-button>
					<el-button size="small" type="primary">查询</el-button>
				</div>
			</div>
		</div>
		<div class="common-card table-wrap">
			<div class="table-header common-card-header common-space">
				<div class="left">
					<img
						src="../assets/img/icon-search-blue.png"
						alt=""
						class="icon-title-pre"
					/>
					<p>查询结果： 共0条记录， 每页显示20条</p>
				</div>
				<div class="right">
					<div class="bt-export" v-show="hasExport">
						<img
							src="../assets/img/icon-export.png"
							alt=""
							class="icon-export"
						/>
						<p>导出数据</p>
					</div>
				</div>
			</div>
			<div class="table-body" @click="tableConfig">
				<el-table :data="[]" stripe border>
					<el-table-column
						v-for="(item, index) of columnList"
						:key="index"
						:label="item.label"
						:min-width="item.width"
					></el-table-column>
				</el-table>
			</div>
			<div class="table-footer">
				<div class="pagination-wrap">
					<el-pagination
						layout="prev, pager, next"
						background
						:total="0"
					>
					</el-pagination>
				</div>
			</div>
		</div>
		<el-dialog title="模板预览" v-model="previewVisible" center width="90%">
			<div id="preview"></div>
		</el-dialog>
	</div>
	<module-config-drawer
		v-model:config="moduleConfig"
		v-model:visible="moduleConfigVisible"
		direction="rtl"
		@beforeClose="beforeModuleConfigClose"
	></module-config-drawer>
	<module-config-drawer
		v-model:config="pageConfig"
		v-model:visible="pageConfigVisible"
		direction="ltr"
	></module-config-drawer>
	<teleport to="#teleport-page-header">
		<el-button type="text" @click="saveTemplate">保存</el-button>
		<el-button type="text" @click="preview">预览</el-button>
	</teleport>
</template>

<script>
import {
	computed,
	inject,
	reactive,
	toRefs,
	watch,
	createApp,
	defineAsyncComponent,
	nextTick,
	resolveComponent,
} from "vue";
import templates from "../material/templates";
import CustomDrag from "../modules/CustomDrag.vue";
import ModuleConfigDrawer from "../modules/ModuleConfigDrawer.vue";
import { copyObj } from "../utils/tools";
// import { updateTemplate } from "../api/templates";
import { ElMessage } from "element-plus";
import { CommonDemo } from "../material/FormList/index";
import CommonOptions from "../material/SelectOptionList/Common";
import generatorConfig from "@/utils/generatorConfig";
import { previewTemplate } from "../api/templates";
export default {
	name: "FormList",
	components: {
		CustomDrag,
		ModuleConfigDrawer,
		CommonDemo,
	},
	setup() {
		const state = reactive({
			icon: computed(() => state.pageConfig.icon.value),
			title: computed(() => state.pageConfig.title.value),
			hasExport: computed(() => state.pageConfig.hasExport.value),
			formList: [],
			columnList: [],
			moduleConfig: {},
			moduleConfigVisible: false,
			pageConfigVisible: false,
			pageConfig: copyObj(
				templates.find((item) => item.value === "FormList")
			).config,
			tableConfigList: {
				columnName: {
					label: "列名",
					value: [{ label: "" }],
					type: "table-config",
				},
			},
			previewVisible: false,
			page: "",
			codes: "",
			activeModule: null,
		});
		const moreClick = inject("moreClick");
		const handleClick = (element) => {
			state.moduleConfigVisible = true;
			state.moduleConfig = element.config;
			state.activeModule = element;
		};
		const tableConfig = () => {
			state.moduleConfig = state.tableConfigList;
			state.moduleConfigVisible = true;
		};
		const getComponent = (name) => {
			return "common-demo";
		};
		const beforeModuleConfigClose = () => {
			// 默认值绑定
			if (
				state.moduleConfig.default &&
				state.moduleConfig.default.value
			) {
				state.activeModule.value = state.moduleConfig.default.value;
			}
			// 下拉框下拉菜单绑定
			if (state.activeModule.name === "DemoSelect") {
				const config = state.moduleConfig.selectConfig;
				if (state.moduleConfig.remote === false) {
					if (config.value.type === "custom") {
						state.moduleConfig.options = config.value.list;
					} else {
						state.moduleConfig.options =
							CommonOptions[config.value.type];
					}
				} else {
					state.moduleConfig.options = [];
				}
			}
		};
		watch(moreClick.value, (val) => {
			state.pageConfigVisible = true;
		});
		const saveTemplate = () => {
			const params = {
				name: state.title,
				config: {
					formList: state.formList,
					columnList: state.tableConfigList,
					icon: state.icon,
					title: state.title,
					hasExport: state.hasExport,
				},
			};
		};
		const preview = () => {
			const config = {
				formList: state.formList,
				columnList: state.tableConfigList,
				icon: state.icon,
				title: state.title,
				hasExport: state.hasExport,
			};
			const params = {
				vue: generatorConfig("formlist", config),
			};
			// previewTemplate(params).then((res) => {
			// const asyncComponent = defineAsyncComponent(() =>
			// 	import(`http://localhost:8068/cache/cache.vue`)
			// );
			const asyncComponent = defineAsyncComponent({
				loader: () => import("http://localhost:8068/cache/cache.vue"),
			});
			// console.log(resolveComponent(asyncComponent));
			// const modules = import.meta.glob.('http://localhost:8068/cache/cache.vue')
			// const app = createApp({
			// 	template: "<async-component></async-component>",
			// 	components: {
			// 		asyncComponent,
			// 	},
			// });
			// state.previewVisible = true;
			// nextTick(() => {
			// 	app.mount("#preview");
			// });
			// });
		};
		return {
			...toRefs(state),
			handleClick,
			moreClick,
			tableConfig,
			getComponent,
			saveTemplate,
			beforeModuleConfigClose,
			preview,
		};
	},
};
</script>

<style lang="less" scoped>
.form-list-container {
	background: #e8e9ed;
	.common-card {
		margin-top: 15px;
	}
	.form-body {
		padding: 15px 0;
		.form-list {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			margin-right: -20px;
			min-height: 40px;
			:deep(.form-item) {
				display: flex;
				align-items: center;
				margin-right: 20px;
				margin-bottom: 12px;
				.item-label {
					width: 80px;
				}
				.item-content {
					width: 170px;
				}
			}
			.zhanweifu {
				width: 250px;
				margin-right: 20px;
			}
		}
		.form-button-group {
			text-align: right;
		}
	}
	.table-wrap {
		.table-header {
			border-bottom: none;
			.bt-export {
				cursor: pointer;
				width: 120px;
				height: 32px;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #3e74ff;
				background-color: #eaf0ff;
				border-radius: 2px;
				.icon-export {
					width: 18px;
					height: 18px;
					margin-right: 7px;
				}
			}
		}

		.table-footer {
			padding: 15px 0;
			.pagination-wrap {
				text-align: right;
			}
		}
	}
}
:deep(.el-dialog) {
	margin-top: 5vh !important;
	.el-dialog__body {
		background: #e8e9ed;
	}
}
</style>
