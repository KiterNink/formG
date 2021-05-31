<template>
	<div class="page-from-diy form-list-final">
		<div class="form-wrap">
			<div class="wrap-header form-header">
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
					<el-button @click="reset">重置</el-button>
					<el-button @click="getData()" type="primary"
						>查询</el-button
					>
				</div>
			</div>
		</div>
		<div class="table-wrap">
			<div class="wrap-header table-header">
				<div class="left">
					<img
						src="../assets/img/icon-search-blue.png"
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
							src="../assets/img/icon-export.png"
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
					v-model="pageNo"
					:total="total"
					background
					@currage-change="getData(pageNo)"
					:page-size="pageSize"
				>
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
const post = (url, params) => {
	return axios
		.post(url, params)
		.then((response, e) => {
			if (response && response.state === 0) {
				return response.data.data;
			} else {
				throw e;
			}
		})
		.catch((e) => {
			throw e;
		});
};
const getData = (params) => {
	return post("", params);
};
export default {
	name: "form-list-final",
	props: {
		options: {
			type: Object,
			default: {},
		},
	},
	data: () => ({
		title: "",
		icon: "",
		formList: [],
		pageNo: 1,
		pageSize: 20,
		list: [],
		total: 0,
	}),
	methods: {
		getData(page, download) {
			if (!page) {
				this.pageNo = 1;
			}
			const params = {
				pageNo: 1,
				pageSize: 20,
			};
			getData(params).then((res) => {
				this.list = res.list;
				this.total = res.total;
			});
		},
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
			:deep(.el-form) {
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
