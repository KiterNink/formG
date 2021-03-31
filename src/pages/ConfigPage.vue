<template>
	<div class="page-header common-space">
		<div class="left">
			<div class="bt-show-config" @click="showSettingDrawer">
				<i class="el-icon-more"></i>
			</div>
			<i>青塔出品</i>
			<el-dropdown trigger="click" @command="selectTemplate">
				<div class="bt-select-template">
					<i class="el-icon-circle-plus-outline"></i>
				</div>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item
							v-for="(item, index) of templateList"
							:command="item.value"
							:key="index"
							>{{ item.label }}</el-dropdown-item
						>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
		<div class="right">
			<el-dropdown trigger="click">
				<span class="user-name">
					{{ userName
					}}<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item>退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>
	<div class="page-center">
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
			<router-view />
		</div>
	</div>
	<module-config-drawer
		v-model:list="setting.configList"
		v-model:visible="setting.visible"
		direction="ltr"
	></module-config-drawer>
	<module-config-drawer
		v-model:list="block.configList"
		v-model:visible="block.visible"
		direction="rtl"
	></module-config-drawer>
</template>

<script>
import { tInput, tDatePicker, tSelect } from "../components/index";
import { moduleList, templateList } from "./ComponentList";
import CustomDrag from "../modules/CustomDrag.vue";
import { computed, reactive, toRefs, provide } from "vue";
import { copyObj } from "@/utils/tools";
import ModuleConfigDrawer from "@/modules/ModuleConfigDrawer.vue";
import { useRouter } from "vue-router";

export default {
	name: "ConfigPage",
	components: {
		CustomDrag,
		tInput,
		tDatePicker,
		tSelect,
		ModuleConfigDrawer,
	},
	provide() {
		return {
			configList: computed(() => this.setting.configList),
		};
	},
	setup() {
		const router = useRouter();
		const state = reactive({
			moduleList: [],
			formList: [],
			configList: [],
			templateList: copyObj(templateList),
			userName: "kiter",
			input: "",
		});
		const setting = reactive({
			configList: [],
			visible: false,
			template: "",
		});
		const block = reactive({
			configList: [],
			visible: false,
		});
		const selectTemplate = (command) => {
			if (command !== setting.template) {
				setting.template = command;
				const template = copyObj(
					state.templateList.find((item) => item.value === command)
				);
				setting.configList = template.tConfig;
				state.moduleList = template.list.map((item) =>
					moduleList.find((i) => i.name === item)
				);
				if (template.value !== "custom") {
					setting.visible = true;
				}
				router.push({ name: command });
			}
		};
		const showSettingDrawer = () => {
			setting.visible = true;
		};
		return {
			...toRefs(state),
			setting,
			block,
			selectTemplate,
			showSettingDrawer,
		};
	},
};
</script>

<style lang="less" scoped>
.page-header {
	height: 40px;
	padding: 0 80px;
	border-bottom: 1px solid #dcdfe6;
	position: relative;
	.bt-select-template {
		cursor: pointer;
		margin-left: 10px;
		width: 20px;
		height: 20px;
		font-size: 19px;
	}
	.bt-show-config {
		position: absolute;
		left: 20px;
		top: 10px;
		cursor: pointer;
	}
}

.page-center {
	height: calc(100% - 55px);
	margin-top: 15px;
	display: flex;
	padding: 0 30px;
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

		.form-list {
			display: flex;
			flex-wrap: wrap;
			min-height: 40px;
			max-height: 100%;
			width: 100%;
			:deep(.list-group-item) {
				margin-right: 10px;
				margin-bottom: 10px;
				&:last-child {
					margin-right: 0;
				}
			}
			.form-item {
				height: 40px;
				position: relative;
				.form-item-label {
					position: absolute;
					height: 40px;
					text-align: center;
					width: 100%;
					line-height: 40px;
					top: 0;
				}
			}
		}

		.table-container {
			.table-list-wrap {
				display: flex;
				flex-wrap: wrap;
				.table-wrap {
					width: 50%;
					margin-bottom: 10px;
				}
			}
		}
	}
}
</style>

<style lang="less" scoped>
:deep(.el-input, .el-input__inner) {
	width: 170px !important;
}
</style>
