<template>
	<el-container class="container">
		<el-aside>
			<el-menu
				:default-active="menuOpenIndex"
				mode="horizontal"
				@select="menuSelect"
				class="menu"
				v-if="menuList.length"
			>
				<el-menu-item
					:index="item.id"
					v-for="(item, index) of menuList"
					:key="index"
					>{{ item.name }}</el-menu-item
				>
			</el-menu>
			<el-empty v-else></el-empty>
		</el-aside>
		<el-main>
			<component
				:is="componentName"
				:id="menuOpenIndex"
				v-if="menuList.length"
			>
				0</component
			>
			<el-empty v-else></el-empty>
		</el-main>
	</el-container>
</template>

<script>
import { reactive, toRefs } from "vue";
import { getPageConfig, getDatabaseList } from "../../api/Database";
import { ElMessage as Message } from "element-plus";
import FormList from "./FormList.vue";
export default {
	name: "index",
	components: {
		FormList,
	},
	setup() {
		const state = reactive({
			menuOpenIndex: "",
			menuList: [],
			pageConfig: {},
			componentName: "form-list",
		});
		const getMenuList = () => {
			getDatabaseList({}).then((res) => {
				state.menuList = res.list;
				if (res.list.length > 0) {
					state.menuOpenIndex = res.list[0].id;
				}
			});
		};
		const menuSelect = (index) => {
			if (index !== state.menuOpenIndex) {
				state.menuOpenIndex = index;
			}
		};
		getMenuList();
		return {
			...toRefs(state),
			getMenuList,
			menuSelect,
		};
	},
};
</script>

<style lang="less" scoped>
.container {
	height: 100%;
	padding: 10px 40px;
	.menu {
		height: 100%;
		.el-menu-item {
			float: none;
		}
	}
}
</style>
