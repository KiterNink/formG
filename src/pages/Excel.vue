<template>
	<div class="excel-container">
		<el-steps :active="currentStep" finish-status="success">
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
				<div class="el-upload__tip">只能上传excel文件</div>
			</template>
		</el-upload>
		<div class="data-wrap">
			<excel-preview
				v-model="excelConfig"
				ref="preview"
				v-if="currentStep === 1"
			></excel-preview>
		</div>
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
			visible: false,
			formConfig: [],
			importLoading: false,
		});
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
				})
				.catch(() => {
					Message.error("导入失败");
					state.importLoading = false;
				});
		};
		const configForm = () => {
			state.status = true;
		};
		return {
			...toRefs(state),
			backToPreStep,
			uploadSuccess,
			uploadError,
			saveExcelConfig,
			configForm,
		};
	},
};
</script>

<style lang="less" scoped>
.excel-container {
	width: 70%;
	margin: 40px auto;
	padding: 20px;
	background: rgba(240, 240, 240, 0.8);
}
:deep(.el-upload) {
	width: 100%;
}
:deep(.el-upload-dragger) {
	margin: 0 auto;
}
.button-group {
	padding: 15px 0;
	text-align: right;
}
.data-wrap {
	max-height: 500px;
	overflow-y: auto;
}
</style>
