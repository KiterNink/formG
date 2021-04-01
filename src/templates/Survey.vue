<template>
	<img
		src="../assets/img/survey/banner.png"
		alt=""
		class="banner"
		v-if="!banner"
	/>
	<img :src="banner" alt="" class="banner" v-else />
	<h1 class="title">问卷信息填报</h1>
	<p class="text">{{ text }}</p>
	<div class="drag-wrap">
		<custom-drag
			v-model="formList"
			class="form-wrap"
			item-key="id"
			group="com"
			@setUniqId="setUniqId"
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
import { computed, reactive, toRefs, inject } from "vue";
import { useRouter } from "vue-router";
import CustomDrag from "@/modules/CustomDrag.vue";
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
			title: computed(
				() =>
					configList.value.find((item) => item.label === "标题").value
			),
			text: computed(
				() =>
					configList.value.find((item) => item.label === "描述").value
			),
			banner: computed(
				() =>
					configList.value.find((item) => item.label === "头部海报")
						.value
			),
		});
		const setUniqId = (index) => {
			const item = state.formList[index];
			if (!item.id) {
				item.id = Date.now();
			}
		};
		return {
			...toRefs(state),
			setUniqId,
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
