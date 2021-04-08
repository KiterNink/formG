<template>
	<div class="config-container">
		<ul class="module-list">
			<li class="module-item"></li>
		</ul>
	</div>
</template>

<script>
import FormList from "@/templates/FormList.vue";
import { reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import modules from "@/assets/material/modules";
import templates from "@/assets/material/templates";
export default {
	components: { FormList },
	setup() {
		const route = useRoute();
		const state = reactive({
			moduleList: [],
		});
		const list = templates.find(
			(item) => (item.value = route.query.template)
		).list;
		state.moduleList = list.map((i) =>
			modules.find((item) => item.name === i)
		);
		return {
			...toRefs(state),
		};
	},
};
</script>

<style lang="less" scoped>
.config-container {
	height: 100%;
	display: flex;
	.module-list {
		flex: 0 0 200px;
	}
}
</style>
