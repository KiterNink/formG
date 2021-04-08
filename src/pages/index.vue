<template>
	<div class="page-header common-space">
		<div class="left">
			<i>青塔出品</i>
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
		<router-view></router-view>
	</div>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
	name: "index",
	setup() {
		const state = reactive({
			userName: "kiter",
		});
		return {
			...toRefs(state),
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
}
.page-center {
	padding: 0 80px;
	height: calc(100% - 40px);
}
</style>
