<template>
	<div class="page-from-diy form-list-final">
		<div class="form-wrap">
			<div class="wrap-header form-header">
				<div class="left">
					<img :src="icon" alt="" class="icon-title-pre" />
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
						src="data:image/png;base64,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"
						alt=""
						class="icon-title-pre"
					/>
					<p>
						查询结果：共{{ total }}条记录,每页显示{{ pageSize }}条
					</p>
				</div>
				<div class="right">
					<div class="bt-export">
						<img
							src="data:image/png;base64,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"
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
