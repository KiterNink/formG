<template>
	<div class="form-list-final" ref="wrap">
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
					<el-button
						:disabled="!selectedList.length"
						type="danger"
						size="mini"
						v-show="checkboxShow"
						@click="deleteItems"
						>确认删除</el-button
					>
					<el-button
						type="danger"
						size="mini"
						@click="checkboxShow = !checkboxShow"
						>{{ checkboxShow ? "取消删除" : "删除" }}</el-button
					>
					<el-button
						type="primary"
						size="mini"
						@click="showImportDialog"
						>导入数据</el-button
					>
					<el-button type="primary" size="mini" @click="addRow"
						>新增一行</el-button
					>
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
				<el-table
					:data="list"
					stripe
					border
					@selection-change="handleSelectionChange"
				>
					<el-table-column
						type="selection"
						width="55"
						v-if="checkboxShow"
					>
					</el-table-column>
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
						<template #default="scope">
							<el-input
								v-model="scope.row[column.prop]"
								placeholder="填入数据"
								size="mini"
								v-if="scope.row.isFake"
								@keyup.enter="saveRowData"
							></el-input>
							<p class="overflow" v-else>
								{{ scope.row[column.prop] }}
							</p>
						</template>
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
	<el-dialog
		title="导入数据"
		v-model="visible"
		destroy-on-close
		:close-on-click-modal="false"
	>
		<el-form :model="form" :rules="formRules" ref="form">
			<el-form-item label="导出模板：">
				<el-button type="primary" size="mini" @click="exportTemplate"
					>点击导出</el-button
				>
			</el-form-item>
			<el-form-item label="数据：" prop="file">
				<el-upload
					class="upload-excel"
					drag
					action="#"
					:http-request="() => {}"
					:form-list="fileList"
					:before-upload="beforeUpload"
					:on-remove="handleRemove"
					accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
				>
					<i class="el-icon-upload"></i>
					<div class="el-upload__text">
						将文件拖到此处，或<em>点击上传</em>
					</div>
					<template #tip>
						<div class="el-upload__tip">
							<span style="color: red">* </span>只能上传excel文件
						</div>
					</template>
				</el-upload>
			</el-form-item>
			<el-form-item label="是否覆盖原数据：" prop="isCover">
				<el-radio-group v-model="form.isCover">
					<el-radio :label="true">覆盖</el-radio>
					<el-radio :label="false">不覆盖</el-radio>
				</el-radio-group>
			</el-form-item>
		</el-form>

		<template #footer>
			<el-button type="primary" size="mini" plain @click="closeDialog"
				>取消</el-button
			>
			<el-button
				:loading="importLoading"
				type="primary"
				size="mini"
				@click="importTable"
				>确定</el-button
			>
		</template>
	</el-dialog>
</template>

<script>
import { computed, reactive, toRefs, watch, watchEffect } from "vue";
import {
	deleteData,
	getPageConfig,
	getTableData,
	modifyTable,
	uploadData,
} from "../../api/Database";
import { ElMessage as Message } from "element-plus";
import { getExcelTemplate, postExcel } from "../../api/templates";
import { downloadBlobData } from "../../utils/tools";

export default {
	name: "FormList",
	props: {
		id: Number,
	},
	computed: {
		fileList() {
			return this.file ? [this.file] : [];
		},
	},
	watch: {
		id(val) {
			this.getData();
		},
	},
	data() {
		return {
			checkboxShow: false,
			title: "",
			formList: [],
			columnList: [],
			pageNo: 1,
			pageSize: 20,
			list: [],
			total: 0,
			loading: false,
			visible: false,
			form: {
				file: null,
				isCover: false,
			},
			formRules: {
				file: [
					{
						required: true,
						message: "未上传文件",
						trigger: "change",
					},
				],
				isCover: [
					{
						required: true,
						message: "选择是否覆盖",
						trigger: "blur",
					},
				],
			},
			importLoading: false,
			selectedList: [],
		};
	},
	methods: {
		exportTemplate() {
			const params = {
				id: this.id,
			};
			getExcelTemplate(params).then((res) => {
				downloadBlobData(res.data, decodeURI(res.etc));
			});
		},
		deleteItems() {
			const params = {
				ids: this.selectedList,
				pageid: this.id,
			};
			deleteData(params)
				.then((res) => {
					Message.success("删除成功");
					this.getList();
				})
				.catch((e) => {
					if (e.data) {
						Message.error(e.data);
					} else {
						Message.error("服务器错误，删除失败");
					}
				});
		},
		handleSelectionChange(val) {
			this.selectedList = val.map((item) => item.id);
		},
		handleRemove() {
			this.form.file = null;
		},
		closeDialog() {
			this.form.file = null;
			this.form.isCover = false;
			this.visible = false;
		},
		importTable() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					const params = new FormData();
					params.set("type", 2);
					params.set("cover", this.form.isCover);
					params.set("file", this.form.file);
					params.set("id", this.id);
					this.importLoading = true;
					uploadData(params)
						.then((res) => {
							this.importLoading = false;
							this.closeDialog();
							Message.success("上传成功");
							this.getList();
						})
						.catch(() => {
							this.importLoading = false;
							Message.error("上传失败");
						});
				} else {
					return;
				}
			});
		},
		saveRowData() {
			let sum = 0;
			const list = [];
			this.list.forEach((item) => {
				if (item.isFake) {
					sum++;
					const element = item;
					delete element.isFake;
					list.push(Object.values(element));
				}
			});
			const params = {
				type: 1,
				id: this.id,
				list,
			};
			modifyTable(params)
				.then((res) => {
					Message.success(`成功添加${sum}组数据`);
					this.getList();
				})
				.catch((e) => {
					this.getList();
					if (e.data) {
						Message.error(e.data);
					} else {
						Message.error("服务器错误,添加失败");
					}
				});
		},
		beforeUpload(file) {
			this.form.file = file;
		},
		addRow() {
			const params = { isFake: true };
			this.columnList.forEach((item) => {
				params[item.prop] = "";
			});
			this.list.push(params);
			this.$refs.wrap.scrollTop = this.$refs.wrap.scrollHeight;
		},
		showImportDialog() {
			this.visible = true;
		},
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
					this.$message.error("服务器错误获取数据失败");
				});
		},
	},
	setup(props, vm) {},
	created() {
		if (this.id) {
			this.getData();
		}
	},
};
</script>

<style lang="less" scoped>
.form-list-final {
	height: 100%;
	overflow-y: auto;
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
				margin-left: 10px;
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
