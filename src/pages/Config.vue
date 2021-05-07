<template>
	<div class="config-container">
		<custom-drag
			custom-class="module-item"
			class="module-list"
			v-model="moduleList"
			item-key="name"
			:group="{ name: 'module', pull: 'clone', put: false }"
		>
			<template #default="{ element }">
				<component :is="element.name" class="item-com"></component>
				<p class="item-label">{{ element.label }}</p>
			</template>
		</custom-drag>
		<div class="canvas-wrap">
			<component :is="activeCom"></component>
		</div>
	</div>
</template>

<script>
import FormList from "../templates/FormList.vue";
import { reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import modules from "../assets/material/modules";
import templates from "../assets/material/templates";
import CustomDrag from "../modules/CustomDrag.vue";
import { tInput, tDatePicker, tSelect } from "../components/index";
export default {
	components: {
		FormList,
		CustomDrag,
		tSelect,
		tInput,
		tDatePicker
	},
	setup() {
		const route = useRoute();
		const state = reactive({
			moduleList: [],
			activeCom: "",
		});
		state.activeCom = route.query.template;
		const list = templates.find(
			(item) => (item.value = route.query.template)
		).list;
		state.moduleList = list.map((i) =>
			modules.find((item) => item.name === i)
		);
		return {
			...toRefs(state)
		};
	},
};
</script>

<style lang="less" scoped>
.config-container {
	height: 100%;
	display: flex;
	padding: 15px 0;
	.module-list,
	.canvas-wrap {
		height: 100%;
		overflow-y: auto;
		padding: 0 20px;
	}
	.module-list {
		flex: 0 0 200px;
		border-right: 1px solid #dcdfe6;
		:deep(.module-item) {
			position: relative;
			height: 40px;
			margin: 20px 0;
			cursor: move;
			.item-label {
				position: absolute;
				height: 100%;
				width: 100%;
				text-align: center;
				line-height: 40px;
				top: 0;
			}
		}
	}
	.canvas-wrap {
		flex: 1;
		margin: 0 20px;
		padding-bottom: 30px;
		background: #e8e9ed;
	}
}
</style>
