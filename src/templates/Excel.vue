<template>
	<el-dialog
		title="导入excel"
		v-model="visible"
		width="width"
		:before-close="dialogBeforeClose"
	>
		<el-steps :active="currentStep" finish-status="success">
			<el-step title="导入excel"></el-step>
			<el-step title="配置字段"></el-step>
		</el-steps>

		<el-upload
			class="upload-excel"
			drag
			action="/form/base/upload-excel/"
			v-if="currentStep === 0"
			:form-list="excelFile"
			:on-success="uploadSuccess"
			:on-error="uploadError"
			:before-upload="beforeUpload"
			:auto-upload="false"
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
		<excel-preview
			v-model="excelConfig"
			ref="preview"
			v-if="currentStep === 1"
		></excel-preview>
		<template #footer>
			<el-button
				type="primary"
				plain
				@click="backToPreStep"
				v-if="currentStep > 0"
				>上一步</el-button
			>
			<el-button
				type="primary"
				@click="uploadExcel"
				v-if="currentStep === 0"
				:loading="uploading"
				>下一步</el-button
			>
			<el-button
				type="primary"
				@click="saveExcelConfig"
				v-if="currentStep === 1"
				>导入</el-button
			>
		</template>
	</el-dialog>
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
	methods: {
		uploadExcel() {
			this.$refs.upload.submit();
		},
		saveExcelConfig() {
			this.$refs.preview.$refs.form.validate((valid) => {
				if (valid) {
					saveConfig(this.excelConfig)
						.then((res) => {
							Message.success(
								`导入成功,成功导入${res.total}条数据`
							);
							this.visible = false;
						})
						.catch(() => {
							Message.error("导入失败");
						});
				} else {
					return;
				}
			});
		},
	},
	setup() {
		const state = reactive({
			visible: true,
			currentStep: 0,
			excelFile: [],
			excelConfig: {},
			uploading: false,
		});
		const uploadSuccess = (response, file) => {
			state.excelConfig = response.data;
			state.currentStep++;
		};
		const backToPreStep = () => {
			state.currentStep--;
		};
		const uploadError = () => {
			s;
			state.uploading = false;
			Message.error("服务器错误,上传失败");
		};
		const beforeUpload = (file) => {
			if (!file.name.match(/\.xl.{1,2}$/)) {
				Message.info("仅支持Excel类型的文件");
				return false;
			} else {
				state.uploading = true;
				state.excelFile = [file];
			}
		};
		return {
			...toRefs(state),
			backToPreStep,
			uploadSuccess,
			uploadError,
			beforeUpload,
		};
	},
};
</script>

<style lang="less" scoped>
:deep(.el-upload, .el-upload-dragger) {
	width: 100%;
}
</style>
