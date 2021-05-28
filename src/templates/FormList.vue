<template>
	<div class="form-list-container">
		<div class="common-card form-wrap">
			<div class="common-card-header common-space">
				<div class="left">
					<img
						src="../assets/img/icon-card-preicon.png"
						alt=""
						class="icon-title-pre"
					/>
					<p class="title">{{ title }}</p>
				</div>
			</div>
			<div class="form-body">
				<custom-drag
					v-model="formList"
					class="form-list"
					item-class="form-item"
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
					<el-button size="mini">重置</el-button>
					<el-button size="mini" type="primary">查询</el-button>
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
				<el-table :data="list" stripe border>
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
		v-model:config="activeModule.config"
		v-model:visible="moduleConfigVisible"
		direction="rtl"
		@beforeClose="beforeModuleConfigClose"
	>
		<template #default>
			<el-form-item label="选择组件:">
				<el-select
					v-model="activeModule.type"
					size="mini"
					@change="comTypeChange"
				>
					<el-option
						v-for="(item, index) of comTypeList"
						:key="index"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
			</el-form-item>
		</template>
	</module-config-drawer>
	<teleport to="#teleport-page-header">
		<el-button type="text" @click="saveTemplate">保存</el-button>
		<el-button type="text" @click="preview">预览</el-button>
	</teleport>
</template>

<script>
import { computed, inject, reactive, toRefs, watch } from "vue";
import CustomDrag from "../modules/CustomDrag.vue";
import ModuleConfigDrawer from "../modules/ModuleConfigDrawer.vue";
import { copyObj } from "../utils/tools";
// import { updateTemplate } from "../api/templates";
import { ElMessage } from "element-plus";
import { CommonDemo } from "../material/FormList/index";
import CommonOptions from "../material/SelectOptionList/Common";
import generatorConfig from "@/utils/generatorConfig";
import { previewTemplate } from "../api/templates";
import modules from "../material/modules";
export default {
	name: "FormList",
	components: {
		CustomDrag,
		ModuleConfigDrawer,
		CommonDemo,
	},
	props: {
		id: [String, Number],
	},
	watch: {
		id(val) {
			this.getTableConfig(val);
		},
	},
	setup(props, vm) {
		const state = reactive({
			hasExport: true,
			title: "分析页面",
			formList: [],
			columnList: [],
			list: [],
			moduleConfigVisible: false,
			tableConfigList: {
				columnName: {
					label: "列名",
					value: [{ label: "" }],
					type: "table-config",
				},
			},
			previewVisible: false,
			activeModule: {},
			comTypeList: [
				{
					label: "输入框",
					value: "input",
				},
				{ label: "日期选择框", value: "date-picker" },
				{ label: "下拉框", value: "select" },
			],
		});
		const handleClick = (element) => {
			state.moduleConfigVisible = true;
			const type = element.type || "input";
			let config = {};
			if (element.config) {
				config = element.config;
			} else {
				config = copyObj(modules[type].config);
				config.label.value = element.label;
			}
			state.activeModule = {
				label: element.label,
				type,
				config,
			};
		};
		const tableConfig = () => {
			state.moduleConfigVisible = true;
		};
		const getComponent = (name) => {
			return "common-demo";
		};
		const beforeModuleConfigClose = () => {};
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
		const preview = () => {};
		const comTypeChange = () => {
			state.activeModule.config = copyObj(
				modules[state.activeModule.type].config
			);
			state.activeModule.config.label.value = state.activeModule.label;
		};
		const getTableConfig = (id) => {
			const params = {
				id,
			};
			getPageConfig(params).then((res) => {
				state.columnList = res.table;
			});
		};
		return {
			...toRefs(state),
			handleClick,
			tableConfig,
			getComponent,
			saveTemplate,
			beforeModuleConfigClose,
			preview,
			comTypeChange,
			getTableConfig,
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
		.comtype-slot-wrap {
			.form-item {
				width: 250px;
				border: 1px dashed #ddd;
				text-align: center;
				height: 40px;
				line-height: 40px;
				display: block;
				color: #ddd;
				&:hover {
					transform: scale(1.1);
				}
			}
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
