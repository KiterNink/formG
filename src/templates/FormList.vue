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
					@setUniqId="setUniqId"
					@handleClick="handleClick"
				>
					<template #default="{ element }">
						<p class="item-label">{{ element.label }}:</p>
						<div class="item-content">
							<component
								:is="element.prop"
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
					<div class="bt-export" v-show="exportShow">
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
			<demo-preview> </demo-preview>
		</el-dialog>
	</div>
	<module-config-drawer
		v-model:list="moduleConfig"
		v-model:visible="moduleConfigVisible"
		direction="rtl"
	></module-config-drawer>
	<module-config-drawer
		v-model:list="pageConfig"
		v-model:visible="pageConfigVisible"
		direction="ltr"
	></module-config-drawer>
</template>

<script>
import { computed, inject, reactive, toRefs, watch } from "vue";
import templates from "@/assets/material/templates";
import CustomDrag from "@/modules/CustomDrag.vue";
import ModuleConfigDrawer from "@/modules/ModuleConfigDrawer.vue";
import FormListFinal from "@/templates/FormListFinal.vue";
import { copyObj } from "../utils/tools";
export default {
	name: "FormList",
	components: {
		CustomDrag,
		ModuleConfigDrawer,
		FormListFinal,
	},
	setup() {
		const state = reactive({
			icon: computed(
				() =>
					state.pageConfig.find((item) => item.label === "前置图标")
						.value
			),
			title: computed(
				() =>
					state.pageConfig.find((item) => item.label === "页头").value
			),
			exportShow: computed(
				() =>
					state.pageConfig.find((item) => item.label === "需要导出")
						.value
			),
			formList: [],
			columnList: [],
			moduleConfig: [],
			moduleConfigVisible: false,
			pageConfigVisible: false,
			pageConfig: templates.find((item) => item.value === "formList")
				.tConfig,
			tableConfigList: [
				{
					label: "列名",
					value: [{ label: "" }],
					type: "table-config",
				},
			],
			previewVisible: false,
			page: "",
		});
		const setUniqId = (index) => {
			const item = state.formList[index];
			if (!item.id) {
				item.id = Date.now();
			}
		};
		const moreClick = inject("moreClick");
		const handleClick = (element) => {
			state.moduleConfigVisible = true;
			state.moduleConfig = copyObj(element.config);
		};
		const tableConfig = () => {
			state.moduleConfig = state.tableConfigList;
			state.moduleConfigVisible = true;
		};
		const previewClick = inject("previewClick");
		watch(previewClick.value, (val) => {
			state.previewVisible = true;
		});
		watch(moreClick.value, (val) => {
			state.pageConfigVisible = true;
		});
		return {
			...toRefs(state),
			setUniqId,
			handleClick,
			moreClick,
			tableConfig,
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
