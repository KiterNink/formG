<template>
	<draggable
		class="list-group"
		v-model="formList"
		tag="transition-group"
		v-bind="dragOptions"
		item-key="dragKey"
		:group="group"
		@start="startDrag"
		@end="endDrag"
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
				:class="itemClass"
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
		group: [Object, String],
		tag: {
			type: String,
			default: "ul",
		},
		itemClass: String,
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
			isDragging: false,
		});
		const handleClick = (data) => {
			vm.emit("handleClick", data);
		};
		const handleClone = (element) => {
			const obj = copyObj(element);
			obj.dragKey = Date.now();
			return obj;
		};
		const startDrag = (e) => {
			vm.emit("startDrag", e);
			state.isDragging = true;
		};
		const endDrag = (e) => {
			// e.dataTransfer.setData("index", "aaa");
			vm.emit("endDrag");
			state.isDragging = false;
		};
		return {
			...toRefs(state),
			handleClick,
			handleClone,
			startDrag,
			endDrag,
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
