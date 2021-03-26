<template>
	<draggable
		class="list-group"
		v-model="formList"
		tag="transition-group"
		v-bind="dragOptions"
		:item-key="itemKey"
		:group="group"
		:component-data="{
			tag: 'ul',
			type: 'transition-group',
			name: 'flip-list',
		}"
	>
		<template #item="{ element }">
			<li class="list-group-item">
				<slot :element="element"></slot>
			</li>
		</template>
	</draggable>
</template>

<script>
import draggable from "vuedraggable";
import { defineComponent, reactive, watchEffect } from "vue";

export default defineComponent({
	name: "CustomDrag",
	components: { draggable },
	props: {
		list: Array,
		itemKey: String,
		group: Object,
	},
	setup(props, vm) {
		const state = reactive({
			dragOptions: {
				animation: 200,
				group: "description",
				disabled: false,
				ghostClass: "ghost",
			},
			formList: vm.attrs.modelValue,
		});
		watchEffect((val) => {
			vm.emit("update:list", state.formList);
		});
		return {
			...state,
		};
	},
});
</script>

<style lang="less" scoped>
.flip-list-move {
	transition: transform 0.5s;
}

.ghost {
	opacity: 0.5;
	background: #c8ebfb;
}

.list-group-item {
	cursor: move;
}
</style>
