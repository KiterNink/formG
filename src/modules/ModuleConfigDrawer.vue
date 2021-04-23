<template>
	<el-drawer
		title="模板配置"
		v-model="visible"
		v-bind="$attrs"
		:before-close="beforeClose"
	>
		<div class="template-config">
			<el-form label-width="100px" label-position="left">
				<el-form-item
					v-for="(item, index) of list"
					:key="index"
					:label="item.label + ':'"
				>
					<el-select
						v-model="item.value"
						size="mini"
						v-if="item.type === 'select'"
					>
						<el-option
							v-for="i in item.options"
							:key="i.value"
							:label="i.label"
							:value="i.value"
						>
						</el-option>
					</el-select>
					<el-upload
						class="image-icon-uploader"
						action="#"
						:show-file-list="false"
						:before-upload="(file) => beforeUpload(file, item)"
						v-else-if="item.type === 'image'"
					>
						<img
							v-if="item.value"
							:src="item.value"
							class="image-icon"
						/>
						<i
							v-else
							class="el-icon-plus image-icon-uploader-icon"
						></i>
					</el-upload>
					<el-radio-group
						v-model="item.value"
						v-else-if="item.type === 'radio'"
					>
						<el-radio
							v-for="(i, _i) of item.options"
							:label="i.value"
							:key="_i"
							>{{ i.label }}</el-radio
						>
					</el-radio-group>
					<div
						class="select-config"
						v-else-if="item.type === 'select-config'"
					>
						<ul class="select-config-list">
							<li
								class="select-config-item"
								v-for="(element, i) of item.value"
								:key="i"
							>
								<el-input
									v-model="element.label"
									placeholder="字段"
									class="input"
								></el-input>
								<el-input
									v-model="element.value"
									placeholder="真实值"
									class="input"
								></el-input>
								<div
									class="bt-delete"
									@click="item.value.splice(i, 1)"
								>
									<i class="el-icon-delete"></i>
								</div>
							</li>
							<li class="select-config-item">
								<el-button
									type="primary"
									@click="
										item.value.push({
											label: '',
											value: '',
										})
									"
									>新增</el-button
								>
							</li>
						</ul>
					</div>
					<div
						class="table-config"
						v-else-if="item.type === 'table-config'"
					>
						<ul class="table-config-list">
							<li
								class="table-config-item"
								v-for="(element, i) of item.value"
								:key="i"
							>
								<el-input
									v-model="element.label"
									placeholder="列头"
									class="input"
								></el-input>
								<div
									class="bt-delete"
									@click="item.value.splice(i, 1)"
								>
									<i class="el-icon-delete"></i>
								</div>
							</li>
							<li class="table-config-item">
								<el-button
									type="primary"
									@click="
										item.value.push({
											label: '',
											value: '',
											width: '',
										})
									"
									>新增列</el-button
								>
							</li>
						</ul>
					</div>
					<el-input
						v-model="item.value"
						size="mini"
						v-else
					></el-input>
				</el-form-item>
			</el-form>
		</div>
	</el-drawer>
</template>

<script>
import { computed } from "vue";
import { ElMessage } from "element-plus";
export default {
	name: "ModuleConfigDrawer",
	inheritAttrs: false,
	props: {
		list: Array,
		visible: Boolean,
	},
	setup(props, vm) {
		const beforeUpload = (file, item) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function (e) {
				item.value = e.target.result;
			};
		};
		const list = computed({
			get: () => props.list,
			set: (val) => {
				vm.emit("update:list", val);
			},
		});
		const visible = computed({
			get: () => props.visible,
			set: (val) => {
				vm.emit("update:visible", val);
			},
		});
		const beforeClose = (done) => {
			if (document.getElementsByClassName("select-config").length > 0) {
				const options = list.value.find(
					(item) => item.type === "select-config"
				).value;
				if (options.find((i) => i.label === "" || i.value === "")) {
					ElMessage.info("有字段未填写完整");
					return;
				}
			}
			if (document.getElementsByClassName("table-config").length > 0) {
				const options = list.value.find(
					(item) => item.type === "table-config"
				).value;
				if (options.find((i) => i.label === "" || i.value === "")) {
					ElMessage.info("有字段未填写完整");
					return;
				}
			}
			done();
		};
		return {
			list,
			visible,
			beforeUpload,
			beforeClose,
		};
	},
};
</script>

<style lang="less" scoped>
.template-config {
	padding: 0 20px;
	.image-icon-uploader {
		cursor: pointer;
		position: relative;
		overflow: hidden;
		width: 50px;
		height: 50px;
	}
	.image-icon-uploader .el-upload:hover {
		border-color: #409eff;
	}
	.image-icon-uploader-icon {
		font-size: 14px;
		color: #8c939d;
		width: 50px;
		height: 50px;
		line-height: 50px;
		text-align: center;
	}
	.image-icon {
		width: 50px;
		height: 50px;
		display: block;
	}
	.select-config {
		&-item {
			display: flex;
			margin-bottom: 10px;
			.input {
				flex: 1;
				margin-right: 20px;
			}
			.bt-delete {
				cursor: pointer;
			}
		}
	}
	.table-config {
	}
}
:deep(.el-input, .el-input__inner) {
	width: 170px;
}
</style>
