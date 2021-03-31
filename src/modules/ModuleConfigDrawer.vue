<template>
	<el-drawer title="模板配置" v-model="visible" v-bind="$attrs">
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
		return {
			list,
			visible,
			beforeUpload,
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
}
</style>
