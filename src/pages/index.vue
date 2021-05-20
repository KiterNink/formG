<template>
	<div class="page-header common-space">
		<div class="left">
			<div class="bt-more" @click="clickMore">
				<i class="el-icon-more"></i>
			</div>
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
			<el-button type="primary" size="mini" @click="save">保存</el-button>
			<el-button type="text" @click="preview" class="bt-preview"
				>预览</el-button
			>
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
	provide() {
		return {
			moreClick: { value: computed(() => this.moreClick) },
			previewClick: { value: computed(() => this.previewClick) },
			saveClick: { value: computed(() => this.saveClick) },
		};
	},
	setup() {
		const router = useRouter();
		const route = useRoute();
		const state = reactive({
			userName: "kiter",
			moreClick: 0,
			previewClick: 0,
			saveClick: 0,
			routes: [
				{ label: "首页", value: "index" },
				{ label: "数据中心", value: "database" },
				{ label: "页面内容", value: "pageMain" },
			],
		});
		const clickMore = () => {
			state.moreClick++;
		};
		const preview = () => {
			state.previewClick++;
		};
		const save = () => {
			state.saveClick++;
		};
		const routerChange = (rou) => {
			if (route.name !== rou) {
				router.push({ name: rou });
			}
		};
		return {
			...toRefs(state),
			preview,
			clickMore,
			save,
			routerChange,
			route,
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
	.bt-more {
		position: absolute;
		left: 40px;
	}
	.bt-preview {
		margin: 0 12px;
	}
	.bt-routechange {
		margin-right: 10px;
		&.active {
			color: #3e74ffdd;
		}
	}
}
.page-center {
	height: calc(100% - 40px);
}
</style>
