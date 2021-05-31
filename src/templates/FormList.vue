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
					<p class="title">{{ form.title }}</p>
				</div>
			</div>
			<div class="form-body">
				<custom-drag
					v-model="formList"
					class="form-list"
					item-class="form-item"
					group="module"
					@handleClick="handleClick"
					@itemAdded="itemAdded"
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
					<div class="bt-export" v-show="form.hasExport">
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
		<!-- <el-dialog title="模板预览" v-model="previewVisible" center width="90%">
			<div id="preview"></div>
		</el-dialog> -->
	</div>
	<module-config-drawer
		v-model:config="activeModule.config"
		v-model:visible="moduleConfigVisible"
		direction="rtl"
		@beforeClose="beforeModuleConfigClose"
		class="custom-drawer"
	>
		<template #default>
			<div class="form-config" v-if="activeModuleType === 'form'">
				<el-button type="danger" @click="deleteFormItem" size="mini"
					>删除</el-button
				>
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
			</div>
			<div class="table-config" v-else>
				<h3>表格配置</h3>
				<ul class="table-column-list">
					<li
						class="table-column"
						v-for="(item, index) of columnList"
						:key="index"
					>
						<el-input v-model="item.label" class="input"></el-input>
						<i
							class="el-icon-delete"
							@click="deleteColumn(index)"
						></i>
					</li>
				</ul>
				<h3>列宽度设置<i style="font-size: 12px">*最小宽度</i></h3>
				<ul class="table-column-list">
					<li
						class="table-column column-cell"
						v-for="(item, index) of columnList"
						:key="index"
					>
						<p class="label overflow">{{ item.label }}</p>
						<el-input
							v-model="item.width"
							placeholder="默认自适应"
							size="mini"
						></el-input>
					</li>
				</ul>
			</div>
		</template>
	</module-config-drawer>
	<teleport to="#teleport-page-header">
		<el-button type="text" @click="handleClickSave">保存</el-button>
		<el-button type="text" @click="preview">预览</el-button>
	</teleport>
	<el-dialog title="页面设置" center v-model="visible">
		<el-form
			label-position="left"
			label-width="150px"
			:rules="formRules"
			:model="form"
			ref="form"
		>
			<el-form-item label="页面标题：" prop="title">
				<el-input
					v-model="form.title"
					placeholder="请输入标题"
					size="mini"
				></el-input>
			</el-form-item>
			<el-form-item label="是否需要导出：">
				<el-radio-group v-model="form.hasExport">
					<el-radio :label="true">需要</el-radio>
					<el-radio :label="false">不需要</el-radio>
				</el-radio-group>
			</el-form-item>
		</el-form>
		<template #footer>
			<div class="button-group">
				<el-button type="primary" plain size="mini" @click="closeDialog"
					>取消</el-button
				>
				<el-button type="primary" size="mini" @click="saveTemplate"
					>保存</el-button
				>
			</div>
		</template>
	</el-dialog>
</template>

<script>
import { computed, inject, reactive, toRefs, watch } from "vue";
import CustomDrag from "../modules/CustomDrag.vue";
import ModuleConfigDrawer from "../modules/ModuleConfigDrawer.vue";
import { copyObj } from "../utils/tools";
// import { updateTemplate } from "../api/templates";
import { ElMessage as Message } from "element-plus";
import { CommonDemo } from "../material/FormList/index";
import CommonOptions from "../material/SelectOptionList/Common";
import generatorConfig from "@/utils/generatorConfig";
import { previewTemplate, updateTemplate } from "../api/templates";
import modules from "../material/modules";
import { getPageConfig, getTableData } from "../api/Database";
import { useRouter } from "vue-router";
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
	data() {
		return {
			form: {
				title: "分析页面",
				hasExport: true,
			},
		};
	},
	methods: {
		saveTemplate() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					const params = {
						name: this.form.title,
						target_id: this.id,
						config: {
							hasExport: this.form.hasExport,
							formList: this.formList,
							table: this.columnList,
						},
					};
					updateTemplate(params)
						.then((res) => {
							this.visible = false;
							this.Router.push({ name: "pages" });
						})
						.catch((e) => {
							if (e.data) {
								Message.error(e.data);
							} else {
								Message.error("服务器错误，保存失败");
							}
						});
				} else {
					return;
				}
			});
		},
		closeDialog() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					this.visible = false;
				} else {
					return;
				}
			});
		},
	},
	setup(props, vm) {
		const Router = useRouter();
		const state = reactive({
			visible: false,
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
			formRules: {
				title: [
					{
						required: true,
						message: "标题不能为空",
						trigger: "blur",
					},
				],
			},
			activeModuleType: "",
		});
		const handleClick = (item) => {
			state.moduleConfigVisible = true;
			const element = state.formList.find(
				(e) => e.dragKey === item.dragKey
			);
			state.activeModule = element;
			state.activeModuleType = "form";
		};
		const tableConfig = () => {
			state.activeModuleType = "table";
			state.moduleConfigVisible = true;
		};
		const getComponent = (name) => {
			return "common-demo";
		};
		const beforeModuleConfigClose = () => {
			if (
				state.activeModuleType === "form" &&
				state.activeModule.config.default.value
			) {
				state.activeModule.value =
					state.activeModule.config.default.value;
			}
			state.activeModule = {};
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
				getTableList(id);
			});
		};
		const getTableList = (id) => {
			const params = {
				id,
				pageNo: 1,
				pageSize: 5,
			};
			getTableData(params).then((res) => {
				state.list = res.list;
			});
		};
		const handleClickSave = () => {
			state.visible = true;
		};
		const deleteFormItem = () => {
			const dragKey = state.activeModule.dragKey;
			const index = state.formList.findIndex(
				(item) => item.dragKey === dragKey
			);
			state.formList.splice(index, 1);
			state.moduleConfigVisible = false;
		};
		const itemAdded = (e) => {
			const index = e.newDraggableIndex;
			const element = state.formList[index];
			element.type = element.type || "input";
			if (!element.config) {
				element.config = copyObj(modules[element.type].config);
				element.config.label.value = element.label;
			}
			if (!element.hasOwnProperty("value")) {
				element.value = "";
			}
		};
		const deleteColumn = (index) => {
			if (state.columnList.length > 1) {
				state.columnList.splice(index, 1);
			} else {
				Message.info("至少保留一列");
			}
		};
		return {
			...toRefs(state),
			handleClick,
			tableConfig,
			getComponent,
			beforeModuleConfigClose,
			preview,
			comTypeChange,
			getTableConfig,
			getTableList,
			handleClickSave,
			Router,
			deleteFormItem,
			itemAdded,
			deleteColumn,
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
.table-config {
	.table-column-list {
		.table-column {
			margin-bottom: 10px;
			.input {
				margin-right: 10px;
			}
			.el-icon-delete {
				cursor: pointer;
			}
			&.column-cell {
				display: flex;
				.label {
					padding-right: 10px;
					width: 80px;
					flex-shrink: 0;
					text-align: left;
				}
			}
		}
	}
}
</style>
