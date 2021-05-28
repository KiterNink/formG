<!--配置模板的页面-->
<template>
	<div class="config-container">
		<div class="aside-wrap">
			<div class="database-wrap">
				<h3>选择数据源</h3>
				<el-select
					v-model="dataId"
					size="mini"
					@change="dataItemChange"
				>
					<el-option
						v-for="item of dataList"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
			</div>
			<div class="field-wrap">
				<h3>选择字段</h3>
				<custom-drag
					item-class="drag-item"
					class="drag-list"
					v-model="fieldList"
					:group="{ name: 'module', pull: 'clone', put: false }"
				>
					<template #default="{ element }">
						<el-input readonly value="" class="item-com"></el-input>
						<p class="item-label">{{ element.label }}</p>
					</template>
				</custom-drag>
			</div>
		</div>

		<div class="canvas-wrap">
			<component :is="activeCom" v-model:id="dataId"></component>
		</div>
	</div>
</template>

<script>
import FormList from "../templates/FormList.vue";
import { reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import templates from "../material/templates";
import CustomDrag from "../modules/CustomDrag.vue";
import { getDatabaseList, getPageConfig } from "../api/Database";

export default {
	components: {
		FormList,
		CustomDrag,
	},
	setup() {
		const route = useRoute();
		const state = reactive({
			activeCom: "",
			dataList: [],
			dataId: "",
			driver: null,
			fieldList: [],
			isDragging: false,
		});
		state.activeCom = route.query.template;
		const list = templates.find(
			(item) => item.value === route.query.template
		).list;
		const getDataList = () => {
			getDatabaseList({}).then((res) => {
				state.dataList = res.list.map((item) => ({
					label: item.name,
					value: item.id,
				}));
			});
		};
		const dataItemChange = () => {
			getDataItemDetail();
			if (state.driver && state.driver.isActivated) {
				state.driver.reset();
			}
		};
		const getDataItemDetail = () => {
			const params = {
				id: state.dataId,
			};
			getPageConfig(params).then((res) => {
				state.moduleList = res.table.filter(
					(item) => item.label !== "序号"
				);
			});
		};
		// getDataList();
		state.fieldList = [
			{ label: "标题" },
			{ label: "文献" },
			{ label: "含义" },
		];
		return {
			...toRefs(state),
			dataItemChange,
		};
	},
	mounted() {
		// if (this.dataId === "") {
		// 	this.driver = new window.Driver({
		// 		allowClose: false,
		// 	});
		// 	this.driver.highlight({
		// 		element: ".database-wrap",
		// 		popover: {
		// 			title: "请选择一个数据源",
		// 			showButtons: false,
		// 			position: "right",
		// 		},
		// 	});
		// }
	},
};
</script>

<style lang="less" scoped>
.config-container {
	height: 100%;
	display: flex;
	padding: 15px 0;
	.aside-wrap,
	.canvas-wrap {
		height: 100%;
		overflow-y: auto;
		padding: 0 20px;
	}
	.aside-wrap {
		flex: 0 0 200px;
		border-right: 1px solid #dcdfe6;
		.database-wrap {
			position: relative;
		}
	}
	.drag-list {
		:deep(.drag-item) {
			position: relative;
			height: 40px;
			margin: 20px 0;
			cursor: move;
			.item-label {
				position: absolute;
				height: 100%;
				width: 100%;
				text-align: center;
				line-height: 40px;
				top: 0;
			}
		}
	}
	.canvas-wrap {
		flex: 1;
		margin: 0 20px;
		padding-bottom: 30px;
		background: #e8e9ed;
	}
}
</style>
