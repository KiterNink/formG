<template>
	<div class="page-header common-space">
		<div class="left">
			<div class="bt-more" @click="clickMore">
				<i class="el-icon-more"></i>
			</div>
			<i>青塔出品</i>
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
export default {
	name: "index",
	provide() {
		return {
			moreClick: { value: computed(() => this.moreClick) },
			previewClick: { value: computed(() => this.previewClick) },
			saveClick: { value: computed(() => this.saveClick) }
		};
	},
	setup() {
		const state = reactive({
			userName: "kiter",
			moreClick: 0,
			previewClick: 0,
			saveClick: 0
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
		return {
			...toRefs(state),
			preview,
			clickMore,
			save
		};
	}
};
</script>

<style lang="less" scoped>
.page-header {
	height: 40px;
	padding: 0 80px;
	border-bottom: 1px solid #dcdfe6;
	position: relative;
	.bt-more {
		cursor: pointer;
		position: absolute;
		left: 40px;
	}
	.bt-preview {
		margin: 0 12px;
	}
}
.page-center {
	height: calc(100% - 40px);
}
</style>
