<template>
	<div class="table-config">
		<ul class="table-config-list">
			<li class="table-config-item" v-for="(element, i) of list" :key="i">
				<el-input
					v-model="element.label"
					placeholder="列头"
					class="input"
				></el-input>
				<div class="bt-delete" @click="list.splice(i, 1)">
					<i class="el-icon-delete"></i>
				</div>
			</li>
			<li class="table-config-item">
				<el-button type="primary" @click="addColumn">新增列</el-button>
			</li>
		</ul>
	</div>
</template>

<script>
import { computed, reactive, toRefs } from "vue";
import { ElMessage as Message } from "element-plus";
export default {
	name: "TableConfig",
	props: {
		modelList: Array,
	},
	setup(props, vm) {
		const state = reactive({
			list: computed(() => {
				get: () => vm.attrs.modelValue;
				set: (val) => {
					vm.emit("update:modelList", val);
				};
			}),
		});
		const addColumn = () => {
			if (
				state.list.length === 0 ||
				state.list.every((item) => item.label)
			) {
				state.list.push({ label: "", value: "" });
			} else {
				Message.info("有字段未填写完整");
				return;
			}
		};
		return {
			...toRefs(state),
			addColumn,
		};
	},
};
</script>

<style lang="less" scoped></style>
