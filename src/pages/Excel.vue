<template>
	<div class="container">
		<el-dialog
			title="Excel导入"
			v-model="visible"
			:close-on-click-modal="false"
			:close-on-press-escape="false"
			@close="closeDialog"
			custom-class="dialog"
			width="80%"
		>
			<div class="excel-container">
				<el-steps
					class="steps-wrap"
					:active="currentStep"
					finish-status="success"
				>
					<el-step title="导入excel"></el-step>
					<el-step title="配置字段"></el-step>
				</el-steps>

				<el-upload
					class="upload-excel"
					drag
					action="/form/formdata/upload-excel/"
					v-if="currentStep === 0"
					:form-list="excelFile"
					:on-success="uploadSuccess"
					:on-error="uploadError"
					accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
					ref="upload"
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
				<div class="data-wrap">
					<excel-preview
						v-model="excelConfig"
						ref="preview"
						v-if="currentStep === 1"
					></excel-preview>
				</div>
			</div>
			<template #footer>
				<div class="button-group">
					<el-button
						type="primary"
						plain
						@click="backToPreStep"
						size="small"
						v-if="currentStep > 0"
						>上一步</el-button
					>
					<el-button
						type="primary"
						@click="saveExcelConfig"
						size="small"
						v-if="currentStep === 1"
						:loading="importLoading"
						>导入</el-button
					>
				</div>
			</template>
		</el-dialog>
	</div>

	<!-- <el-dialog title="提示" v-model="visible">
		<div class="result-wrap" v-if="!status">
			<el-result
				icon="success"
				title="操作成功"
				sub-title="正在后台导入数据"
			>
				<template #extra>
					<el-button type="primary" @click="configForm"
						>开始配置</el-button
					>
				</template>
			</el-result>
		</div>
		<div class="form-config-wrap" v-else></div>
	</el-dialog> -->
</template>

<script>
import { reactive, toRefs } from "vue";
import { saveConfig } from "../api/templates";
import { ElMessage as Message } from "element-plus";
import ExcelPreview from "@/modules/ExcelPreview.vue";
import { useRouter } from "vue-router";
export default {
	name: "Excel",
	components: {
		ExcelPreview,
	},
	setup() {
		const state = reactive({
			currentStep: 0,
			excelFile: [],
			excelConfig: {},
			visible: true,
			formConfig: [],
			importLoading: false,
		});
		const Router = useRouter();
		const uploadSuccess = (response, file) => {
			state.excelConfig = response.data;
			state.excelFile = [file];
			state.currentStep++;
		};
		const backToPreStep = () => {
			state.currentStep--;
		};
		const uploadError = () => {
			Message.error("服务器错误,上传失败");
		};
		const saveExcelConfig = () => {
			state.importLoading = true;
			const config = state.excelConfig;
			for (const key in config) {
				if (!config[key]) {
					Message.info("字段未填写完整");
					return;
				}
			}
			const params = new FormData();
			params.set("tableName", config.tableName);
			params.set("columnList", config.columnList);
			params.set("typeList", config.typeList);
			params.set("file", state.excelFile[0].raw);
			saveConfig(params)
				.then((res) => {
					// state.formConfig = res.form;
					state.importLoading = false;
					Message.success("导入成功");
					Router.push({ name: "Database" });
				})
				.catch((e) => {
					Message.error(`导入失败${e.data}`);
					state.importLoading = false;
				});
		};
		const configForm = () => {
			state.status = true;
		};
		const closeDialog = () => {
			Router.push({ name: "index" });
		};
		return {
			...toRefs(state),
			backToPreStep,
			uploadSuccess,
			uploadError,
			saveExcelConfig,
			configForm,
			closeDialog,
		};
	},
};
</script>

<style lang="less" scoped>
.container {
	:deep(.el-dialog) {
		margin-top: 5vh !important;
	}
}
.excel-container {
	width: 100%;
	margin: 10px auto;
	padding: 20px;
	.upload-excel {
		width: 100%;
		:deep(.el-upload) {
			width: 100%;
		}
		:deep(.el-upload-dragger) {
			margin: 0 auto;
		}
	}
}
.button-group {
	padding: 15px 0;
	text-align: right;
}
.data-wrap {
	max-height: 400px;
	overflow-y: auto;
}
.steps-wrap {
	margin-bottom: 20px;
}
</style>
