<template>
	<div class="config-container">
		<div class="com-list-wrap">
			<custom-drag
				v-model="moduleList"
				item-key="name"
				:group="{ name: 'com', pull: 'clone', put: false }"
			>
				<template #default="{ element }">
					<div class="com-item">
						<component :is="element.name" class="com"></component>
						<p class="com-item-label">{{ element.label }}</p>
					</div>
				</template>
			</custom-drag>
		</div>
		<div class="canvas-wrap">
			<component :is="activeCom"></component>
		</div>
	</div>
	<!-- <module-config-drawer
		v-model:list="setting.configList"
		v-model:visible="setting.visible"
		direction="ltr"
	></module-config-drawer>
	<module-config-drawer
		v-model:list="block.configList"
		v-model:visible="block.visible"
		direction="rtl"
	></module-config-drawer> -->
</template>

<script>
import { tInput, tDatePicker, tSelect } from "../components/index";
import modules from "@/assets/material/modules";
import templates from "@/assets/material/templates";
import CustomDrag from "../modules/CustomDrag.vue";
import { computed, reactive, toRefs, provide } from "vue";
import { copyObj } from "@/utils/tools";
import ModuleConfigDrawer from "@/modules/ModuleConfigDrawer.vue";
import { useRouter, useRoute } from "vue-router";
import FormList from "@/templates/FormList.vue";

export default {
	name: "ConfigPage",
	components: {
		CustomDrag,
		tInput,
		tDatePicker,
		tSelect,
		ModuleConfigDrawer,
		FormList,
	},
	provide() {},
	setup() {
		const route = useRoute();
		// const state = reactive({
		// 	activeCom: route.query.template,
		// 	id: route.query.id,
		// 	moduleList: [],
		// });
		// state.moduleList = templates.find(
		// 	(item) => item.value === state.activeCom
		// ).list;
		return {
			// ...toRefs(state),
		};
	},
};
</script>

<style lang="less" scoped>
.config-container {
	display: flex;
	height: 100%;
	.com-list-wrap,
	.canvas-wrap {
		height: 100%;
		overflow-y: auto;
		padding: 0 20px;
	}

	.com-list-wrap {
		flex: 0 0 200px;
		display: inline-block;
		border-right: 1px solid #dcdfe6;
		padding-left: 0;
		.com-item {
			position: relative;
			height: 40px;
			margin: 20px 0;
			cursor: move;

			&:first-child {
				margin-top: 0;
			}

			&:hover {
				box-shadow: 0 0 6px 3px rgb(64 158 255 / 60%);
			}

			.com {
				opacity: 0.9;
				width: 100%;
			}
			:deep(.el-input, .el-input__inner) {
				width: 170px;
			}

			.com-item-label {
				position: absolute;
				width: 100%;
				height: 100%;
				text-align: center;
				line-height: 40px;
				top: 0;
			}
		}
	}

	.canvas-wrap {
		flex: 1;
		margin-left: 20px;
		padding-bottom: 30px;
	}
}
</style>

<style lang="less" scoped></style>
