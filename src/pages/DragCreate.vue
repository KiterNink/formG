<template>
	<el-container class="container">
		<el-aside width="200px" class="aside-left">
			<div
				class="type-class"
				v-for="(item, index) of classList"
				:key="index"
			>
				<h2>{{ item.label }}</h2>
				<custom-drag
					item-class="type-item"
					class="type-wrap"
					v-model="item.list"
					:group="{ name: 'module', pull: 'clone', put: false }"
					@handleClick="handleClick"
				>
					<template #default="{ element }">
						<div>{{ element.label }}</div>
					</template>
				</custom-drag>
			</div>
		</el-aside>
		<el-main>
			<custom-drag
				v-model="fieldList"
				class="field-list"
				item-class="field-item"
				group="module"
			>
				<template #default="{ element }">
					<el-input
						class="item-label"
						v-model="element.label"
					></el-input>
					<i
						class="el-icon-close"
						@click="deleteField(element.id)"
					></i>
				</template>
			</custom-drag>
		</el-main>
		<el-aside class="aside-right" width="300px">
			<el-form>
				<el-form-item label="表名">
					<el-input v-model="tableName"></el-input>
				</el-form-item>
			</el-form>
		</el-aside>
	</el-container>
	<teleport to="#teleport-page-header">
		<el-button type="text" @click="save">保存</el-button>
	</teleport>
</template>

<script>
import { reactive, toRefs } from "vue";
import CustomDrag from "../modules/CustomDrag.vue";
import { ElMessage as Message } from "element-plus";
import { saveConfig } from "../api/templates";
import { copyObj } from "../utils/tools";
import { useRouter } from "vue-router";
export default {
	name: "DragCreate",
	components: {
		CustomDrag,
	},
	setup() {
		const state = reactive({
			classList: [
				{
					label: "基础类型",
					list: [
						{ label: "单行文本", value: "STR" },
						{ label: "整数", value: "INT" },
						{ label: "浮点数", value: "FLOAT" },
						{ label: "学校名称", value: "PP" },
						{ label: "下拉框", value: "LT" },
					],
				},
			],
			fieldList: [],
			tableName: "默认表名",
		});
		const Router = useRouter();
		const handleClick = (item) => {
			const id = Date.now();
			item.id = id;
			state.fieldList.push(copyObj(item));
		};
		const arrayUniq = (arr) => {
			let flag = true;
			arr.forEach((item, index) => {
				arr.forEach((element, i) => {
					if (i !== index && item === element) {
						flag = false;
					}
				});
			});
			return flag;
		};

		const save = () => {
			if (!state.fieldList.length) {
				Message.info("至少得有一个字段吧兄弟～");
			} else if (!state.tableName) {
				Message.info("表名不能为空");
			} else if (!arrayUniq(state.fieldList.map((item) => item.label))) {
				Message.info("字段名称不可重复");
			} else {
				const params = new FormData();
				params.set("tableName", state.tableName);
				params.set(
					"columnList",
					state.fieldList.map((item) => item.label)
				);
				params.set(
					"typeList",
					state.fieldList.map((item) => item.value)
				);
				// const params = {
				// 	tableName: state.tableName,
				// 	columnList: state.fieldList.map((item) => item.label),
				// 	typeList: state.fieldList.map((item) => item.value),
				// };
				saveConfig(params)
					.then((res) => {
						Router.push({ name: "Database" });
						Message.success("创建成功");
					})
					.catch((e) => {
						if (e.data) {
							Message.error(e.data);
						} else {
							Message.error("服务器错误,创建失败");
						}
					});
			}
		};
		const deleteField = (id) => {
			state.fieldList.splice(
				state.fieldList.findIndex((item) => item.id === id),
				1
			);
		};
		return {
			...toRefs(state),
			handleClick,
			save,
			deleteField,
		};
	},
};
</script>

<style lang="less" scoped>
.container {
	padding: 0px 40px;
	height: 100%;
	.aside-left {
		border-right: 1px solid #ddd;
	}
	.aside-right {
		border-left: 1px solid #ddd;
		padding: 10px;
	}
}
.type-class {
	:deep(.type-wrap) {
		line-height: 30px;
		.type-item {
			padding: 10px;
			&:hover {
				border-bottom: 1px dashed green;
			}
		}
	}
}
.field-list {
	height: 100%;
	overflow-y: auto;
	:deep(.field-item) {
		padding: 10px;
		display: flex;
		align-items: center;
		cursor: default;
		.item-label {
		}
		.el-icon-close {
			cursor: pointer;
			margin-left: 10px;
		}
	}
}
</style>
