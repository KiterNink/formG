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
		:clone="handleClone"
		:component-data="{
			tag: tag,
			type: 'transition-group',
			name: isDragging ? null : 'flip-list',
		}"
	>
		<template #item="{ element }">
			<li
				class="list-group-item"
				:class="customClass"
				@click="handleClick(element)"
				v-if="tag === 'ul'"
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
import { reactive, toRefs, ref, computed } from "vue";
import { copyObj } from "../utils/tools";

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
		customClass: String,
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
		const handleClick = (data) => {
			vm.emit("handleClick", data);
		};
		const handleClone = (element) => {
			element.id = Date.now();
			return copyObj(element);
		};
		return {
			...toRefs(state),
			isDragging: ref(false),
			handleClick,
			handleClone,
		};
	},
};
</script>

<style lang="less" scoped>
.list-group {
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
