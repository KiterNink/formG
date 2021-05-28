<template>
	<img
		src="../assets/img/survey/banner.png"
		alt=""
		class="banner"
		v-if="!banner"
	/>
	<img :src="banner" alt="" class="banner" v-else />
	<h1 class="title">{{ title }}</h1>
	<p class="text">{{ text }}</p>
	<div class="drag-wrap">
		<custom-drag
			v-model="formList"
			class="form-wrap"
			group="com"
			custom-item-class="form-item"
		>
			<template #default="{ element }">
				<p class="form-item-label">{{ element.label }}</p>
				<div class="form-item-content">
					<component :is="element.prop"></component>
				</div>
			</template>
		</custom-drag>
	</div>
	<div class="button-wrap">
		<el-button type="primary">提交</el-button>
	</div>
</template>

<script>
import { computed, reactive, toRefs, inject, watch } from "vue";
import { useRouter } from "vue-router";
import CustomDrag from "../modules/CustomDrag.vue";
export default {
	name: "survey",
	components: { CustomDrag },
	setup(props, vm) {
		const router = useRouter();
		const configList = inject("configList");
		if (configList.value.length === 0) {
			router.replace("/");
		}
		const state = reactive({
			formList: [],
			title: configList.value.find((item) => item.label === "标题").value,
			text: configList.value.find((item) => item.label === "描述").value,
			banner: configList.value.find((item) => item.label === "头部海报")
				.value,
		});
		watch(configList.value, (val) => {
			state.title = val.find((item) => item.label === "标题").value;
			state.text = val.find((item) => item.label === "描述").value;
			state.banner = val.find((item) => item.label === "头部海报").value;
		});
		return {
			...toRefs(state),
		};
	},
};
</script>

<style lang="less" scoped>
.banner {
	width: 100%;
}
.title {
	text-align: center;
}
.text {
	margin-bottom: 20px;
}

:deep(.form-item) {
	margin-bottom: 20px;
	.form-item-label {
		margin-bottom: 12px;
	}
}
.drag-wrap {
	min-height: 50px;
	margin-bottom: 20px;
}
.button-wrap {
	text-align: center;
}
</style>
