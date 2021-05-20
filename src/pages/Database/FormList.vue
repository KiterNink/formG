<template>
	<div class="form-list-final">
		<!-- <div class="form-wrap">
			<div class="wrap-header form-header">
				<div class="left">
					<img
						src="../../assets/img/icon-card-preicon.png"
						alt=""
						class="icon-title-pre"
					/>
					<p class="title">{{ title }}</p>
				</div>
			</div>
			<div class="form-body">
				<el-form label-width="80px" label-position="left">
					<el-form-item
						v-for="(item, index) of formList"
						:key="index"
						:label="item.label"
					>
					</el-form-item>
					<i
						class="zhanweifu"
						v-for="_ in formList"
						:key="'zhanweifu' + _"
					></i>
				</el-form>
				<div class="form-footer">
					<el-button @click="reset" size="mini">重置</el-button>
					<el-button @click="getData()" type="primary" size="mini"
						>查询</el-button
					>
				</div>
			</div>
		</div> -->
		<div class="table-wrap" v-loading="loading">
			<div class="wrap-header table-header">
				<div class="left">
					<img
						src="../../assets/img/icon-search-blue.png"
						alt=""
						class="icon-title-pre"
					/>
					<p>
						查询结果：共{{ total }}条记录,每页显示{{ pageSize }}条
					</p>
				</div>
				<div class="right">
					<div class="bt-import"></div>
					<div class="bt-export">
						<img
							src="../../assets/img/icon-export.png"
							alt=""
							class="icon-export"
						/>
						<p>导出数据</p>
					</div>
				</div>
			</div>
			<div class="table-body">
				<el-table :data="list" stripe border>
					<el-table-column
						label="序号"
						type="index"
						:index="indexMethod"
					></el-table-column>
					<el-table-column
						v-for="(column, index) of columnList"
						:key="index"
						:label="column.label"
						:prop="column.prop"
						:min-width="column.width"
						show-overflow-tooltip
					>
					</el-table-column>
				</el-table>
			</div>
			<div class="table-footer">
				<el-pagination
					layout="prev, pager, next"
					v-model:current-page="pageNo"
					:total="total"
					background
					@current-change="getList(pageNo)"
					:page-size="pageSize"
				>
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
import { computed, reactive, toRefs, watch, watchEffect } from "vue";
import { getPageConfig, getTableData } from "../../api/Database";

export default {
	name: "FormList",
	props: {
		id: Number,
	},
	watch: {
		id(val) {
			this.getData();
		},
	},
	methods: {
		indexMethod(index) {
			return (this.pageNo - 1) * this.pageSize + index + 1;
		},
		getData() {
			const params = {
				id: this.id,
			};
			this.loading = true;
			getPageConfig(params)
				.then((res) => {
					this.columnList = res.table;
					this.title = res.title;
					this.getList();
				})
				.catch(() => {
					this.loading = false;
					this.$message.error("服务器错误获取配置项失败");
				});
		},
		getList(page, download) {
			if (!page) {
				this.pageNo = 1;
			}
			const params = {
				pageNo: this.pageNo,
				pageSize: this.pageSize,
				id: this.id,
			};
			getTableData(params)
				.then((res) => {
					this.list = res.list;
					this.total = res.total;
					this.loading = false;
				})
				.catch(() => {
					this.loading = false;
					this.$message.error("服务器错误");
				});
		},
	},
	setup(props, vm) {
		const state = reactive({
			title: "",
			formList: [],
			columnList: [],
			pageNo: 1,
			pageSize: 20,
			list: [],
			total: 0,
			loading: false,
			// pageId: computed({
			// 	get: () => {
			// 		return vm.attrs.modelValue;
			// 	},
			// 	set: (val) => {
			// 		vm.emit("update:id", val);
			// 	},
			// }),
		});
		return {
			...toRefs(state),
		};
	},
};
</script>

<style lang="less" scoped>
.form-list-final {
	.form-wrap,
	.table-wrap {
		padding: 0 20px;
		background-color: #fff;
		box-shadow: 0 3px 6px 0 #f0f1f2;
		border-radius: 2px;
	}
	.wrap-header {
		height: 40px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		& > .left,
		& > .right {
			display: flex;
			align-items: center;
		}
		.icon-title-pre {
			width: 20px;
			height: 20px;
			margin-right: 8px;
		}
		.title {
			font-size: 16px;
			color: #141617;
			font-weight: 700;
		}
	}
	.form-wrap {
		margin-bottom: 15px;
		.form-header {
			border-bottom: 1px solid #efefef;
		}
		.form-body {
			padding: 15px 0;
			/deep/ .el-form {
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				justify-content: space-between;
				margin-right: -20px;
				.el-form-item {
					display: flex;
					align-items: center;
					width: 170px;
					margin-right: 20px;
					margin-bottom: 15px;
					.el-form-item__label {
						width: 80px;
					}
					.el-form-item__content {
						width: 90px;
						.el-input,
						.el-input__inner {
							width: 100%;
						}
					}
				}
				.zhanweifu {
					width: 170px;
					margin-right: 20px;
				}
			}
		}
		.form-footer {
			text-align: right;
		}
	}
	.table-wrap {
		.table-header {
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
		.table-body {
		}
		.table-footer {
			text-align: right;
			padding: 15px 0;
		}
	}
}
</style>
