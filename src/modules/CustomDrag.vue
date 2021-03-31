<template>
	<draggable
		class="list-group"
		v-model="formList"
		tag="transition-group"
		v-bind="dragOptions"
		:item-key="itemKey"
		:group="group"
		@start="isDragging = true"
		@end="isDragging = false"
		@change="listAdded"
		:component-data="{
			tag: tag,
			type: 'transition-group',
			name: isDragging ? null : 'flip-list',
		}"
	>
		<template #item="{ element }">
			<li
				class="list-group-item"
				v-if="tag === 'ul'"
				@click="handleClick(element)"
			>
				<slot :element="element"></slot>
			</li>
		</template>
		<template #footer>
			<slot name="footer"></slot>
		</template>
	</draggable>
</template>

<script>
import draggable from "vuedraggable";
import { reactive, toRefs, ref, computed, inject } from "vue";

export default {
	name: "CustomDrag",
	components: { draggable },
	props: {
		list: Array,
		itemKey: String,
		group: [Object, String],
		tag: {
			type: String,
			default: "ul",
		},
	},
	setup(props, vm) {
		const state = reactive({
			dragOptions: {
				animation: 200,
				group: "description",
				disabled: false,
				ghostClass: "ghost",
			},
			formList: computed({
				get: () => {
					return vm.attrs.modelValue;
				},
				set: (val) => {
					vm.emit("update:list", val);
				},
			}),
		});
		const listAdded = (e) => {
			if (e.added) {
				vm.emit("setUniqId", e.added.newIndex);
			}
		};
		const clickItem = inject("showRightDrawer");
		const handleClick = (item) => {
			clickItem(item);
		};
		return {
			...toRefs(state),
			isDragging: ref(false),
			listAdded,
			handleClick,
		};
	},
};
</script>

<style lang="less" scoped>
.list-group {
	width: 100%;
	min-height: 100%;
}
.flip-list-move {
	transition: all 0.5s;
}
.no-move {
	transition: all 0;
}

.ghost {
	opacity: 0.5;
	background: #c8ebfb;
}

.list-group-item {
	cursor: move;
}
</style>
