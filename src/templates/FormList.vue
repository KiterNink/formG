<template>
	<div
		class="form-container common-card"
		:style="{
			marginBottom: splitTop ? '15px' : '',
		}"
	>
		<div class="common-card-header common-space form-container-header">
			<div class="left">
				<img :src="preIcon" alt="" class="icon-pre-title" />
				<p class="title">{{ title }}</p>
			</div>
		</div>
		<div class="form-container-body">
			<div class="el-form-container">
				<custom-drag
					tag="ul"
					v-model="formList"
					class="el-form-wrap"
					itemKey="name"
					group="com"
				>
					<template #default="{ element }">
						<p class="item-label">{{ element.label }}:</p>
						<div class="item content">
							<component
								:is="element.prop"
								size="small"
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
			</div>
			<div class="button-group">
				<el-button type="primary" size="small" plain>重置</el-button>
				<el-button type="primary" size="small">查询</el-button>
			</div>
		</div>
	</div>
	<div class="table-container common-card">
		<div class="common-card-header table-container-header common-space">
			<div class="left">
				<img
					src="../assets/img/icon-search-blue.png"
					alt=""
					class="icon-pre-title"
				/>
				<p>查询结果：共 0 条记录，每页显示20条</p>
			</div>
			<div class="right" v-if="exportShow">
				<div class="bt-export">
					<img
						src="../assets/img/icon-export.png"
						alt=""
						class="icon-export"
					/>
					<p>导出数据</p>
				</div>
			</div>
		</div>
		<div class="table-container-body">
			<el-table :data="[]" style="width: 100%" border stripe>
				<el-table-column prop="prop" label="label" width="width">
				</el-table-column>
			</el-table>
			<div class="pagination-wrap">
				<el-pagination layout="prev, pager, next" background :total="0">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
import { inject, reactive, watch, toRefs, computed } from "vue";
import { useRouter } from "vue-router";
import CustomDrag from "@/modules/CustomDrag.vue";
export default {
	components: {
		CustomDrag,
	},
	setup(props, vm) {
		const router = useRouter();
		const configList = inject("configList");
		if (configList.value.length === 0) {
			router.replace("/");
		}
		const state = reactive({
			formList: [],
			preIcon: computed(
				() =>
					configList.value.find((item) => item.label === "前置图标")
						.value
			),
			exportShow: computed(
				() =>
					configList.value.find((item) => item.label === "需要导出")
						.value
			),
			title: computed(
				() =>
					configList.value.find((item) => item.label === "页头").value
			),
			splitTop: computed(
				() =>
					configList.value.find((item) => item.label === "上下分开")
						.value
			),
			layout: computed(() => {
				configList.value.find((item) => item.label === "布局").value;
			}),
		});
		return {
			...toRefs(state),
		};
	},
};
</script>

<style lang="less" scoped>
.form-container {
	.form-container-header {
		border-bottom: 1px solid #efefef;
		.title {
			font-size: 16px;
			color: #141617;
			font-weight: 700;
		}
	}
	.form-container-body {
		margin-top: 15px;
		.el-form-container {
			min-height: 55px;
			.el-form-wrap {
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				justify-content: space-between;
				margin-right: -20px;
				width: calc(100% + 20px);
				:deep(.list-group-item) {
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
				i.zhanweifu {
					width: 250px;
					margin-right: 20px;
				}
			}
		}
		.button-group {
			text-align: right;
			padding-bottom: 15px;
		}
	}
}
.table-container {
	.table-container-header {
		padding: 8px 0;
		height: auto;
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
	.table-container-body {
		.pagination-wrap {
			padding: 20px 0;
			text-align: right;
		}
	}
}
</style>
