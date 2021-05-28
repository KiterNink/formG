<template>
	<div class="page-header common-space">
		<div class="left">
			<i
				@click="routerChange(item.value)"
				v-for="(item, index) of routes"
				:key="index"
				class="bt-routechange"
				:class="item.value === route.name ? 'active' : ''"
				>{{ item.label }}</i
			>
		</div>
		<div class="right">
			<!-- <el-button type="primary" size="mini" @click="save">保存</el-button>
			<el-button type="text" @click="preview" class="bt-preview"
				>预览</el-button
			> -->
			<div id="teleport-page-header"></div>
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
import { reactive, toRefs, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
	name: "index",
	setup() {
		const router = useRouter();
		const route = useRoute();
		const state = reactive({
			userName: "kiter",
			routes: [
				{ label: "首页", value: "index" },
				{ label: "数据中心", value: "Database" },
				{ label: "页面内容", value: "PageMain" },
			],
		});
		const routerChange = (rou) => {
			if (route.name !== rou) {
				router.push({ name: rou });
			}
		};
		return {
			...toRefs(state),
			routerChange,
			route,
		};
	},
};
</script>

<style lang="less" scoped>
.page-header {
	height: 40px;
	padding: 0 40px;
	border-bottom: 1px solid #dcdfe6;
	position: relative;
	.bt-more {
		position: absolute;
		left: 40px;
	}
	.bt-preview {
		margin: 0 12px;
	}
	.bt-routechange {
		margin-right: 10px;
		cursor: pointer;
		&.active {
			color: #3e74ffdd;
		}
		&:hover {
			color: #3e74ffdd;
			transform: scale(1.2);
		}
	}
	#teleport-page-header {
		margin: 0 10px;
	}
}
.page-center {
	height: calc(100% - 40px);
}
</style>
