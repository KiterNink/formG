<template>
	<div class="select-config">
		<el-select
			v-model="configObject.type"
			placeholder="选择下拉数据列"
			size="mini"
		>
			<el-option
				v-for="item in selectOptions"
				:key="item.label"
				:label="item.label"
				:value="item.label"
			>
			</el-option>
			<el-option label="手动添加" value="custom"></el-option>
		</el-select>
		<ul class="select-list-wrap" v-if="configObject.type === 'custom'">
			<el-button type="primary" size="mini" @click="addOption"
				>新增</el-button
			>
			<li
				class="select-config-item"
				v-for="(element, i) of configObject.list"
				:key="i"
			>
				<el-input
					v-model="element.label"
					placeholder="字段"
					class="input"
					size="mini"
				></el-input>
				<el-input
					v-model="element.value"
					placeholder="真实值"
					class="input"
					size="mini"
				></el-input>
				<div class="bt-delete" @click="list.splice(i, 1)">
					<i class="el-icon-delete"></i>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
import { computed, reactive, toRefs } from "vue";
import SelectList from "../../material/SelectOptionList/Common";
import { ElMessage as Message } from "element-plus";
export default {
	name: "SelectConfig",
	props: {
		modelList: Object,
	},
	setup(props, vm) {
		const state = reactive({
			configObject: computed({
				get: () => vm.attrs.modelValue,
				set: (val) => {
					vm.emit("update:modelList", val);
				},
			}),
			selectOptions: SelectList,
		});
		const addOption = () => {
			if (
				state.configObject.list.length === 0 ||
				state.configObject.list.every(
					(item) => item.label && item.value
				)
			) {
				state.configObject.list.push({
					label: "",
					value: "",
				});
			} else {
				Message.info("还有字段未填写完整");
				return;
			}
		};
		return {
			...toRefs(state),
			addOption,
		};
	},
};
</script>
