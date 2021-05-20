<template>
	<el-container class="container">
		<el-aside>
			<el-menu
				:default-active="menuOpenIndex"
				mode="horizontal"
				@select="menuSelect"
			>
				<el-menu-item index="index"></el-menu-item>
			</el-menu>
		</el-aside>
		<el-main> </el-main>
	</el-container>
</template>

<script>
import { reactive, toRefs } from "vue";
import { getDatabaseList } from "../api/templates";
const response = {
	state: 0,
	data: {
		name: "中科院数据",
		id: 1,
		form: [
			{
				label: "标题",
				type: "input",
				prop: "title",
				config: [],
			},
			{
				label: "性别",
				type: "select",
				prop: "sex",
				config: {
					multiple: true,
					data: [
						{ label: "男", value: "男" },
						{ label: "女", value: "女" },
					],
				},
			},
		],
		table: [{ label: "标题", prop: "title" }],
	},
};
export default {
	name: "Database",
	setup() {
		const state = reactive({
			menuOpenIndex: "",
			menuList: [],
		});
		const getMenuList = () => {
			getDatabaseList({}).then((res) => {
				state.menuList = res.list;
				state.menuOpenIndex = state.menuList[0];
			});
			getMenuList();
		};
		return {
			...toRefs(state),
			getMenuList,
		};
	},
};
</script>

<style lang="less" scoped>
.container {
	height: 100%;
}
</style>
