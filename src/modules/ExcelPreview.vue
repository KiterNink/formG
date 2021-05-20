<template>
	<div class="table-top">
		<el-form label-width="80px" inline label-position="left">
			<el-form-item label="表名">
				<el-input v-model="config.tableName" size="small"></el-input>
			</el-form-item>
		</el-form>
	</div>
	<div class="table-wrap">
		<table>
			<thead>
				<tr>
					<td class="td-label">表头文字</td>
					<td v-for="(item, index) of config.columnList" :key="index">
						<el-input
							v-model="config.columnList[index]"
							size="small"
						></el-input>
					</td>
				</tr>
				<tr>
					<td class="td-label">字段类型</td>
					<td v-for="(type, index) of config.typeList" :key="index">
						<el-select
							v-model="config.typeList[index]"
							size="small"
						>
							<el-option
								v-for="item of typeList"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							>
							</el-option>
						</el-select>
					</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, index) of config.list" :key="index">
					<td>{{ index + 1 }}</td>
					<td v-for="(data, i) of item" :key="i">{{ data }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import { computed, reactive, toRefs } from "vue";
import { getTypeList } from "../api/templates";
export default {
	name: "ExcelPreview",
	props: {
		excelConfig: Object,
	},
	setup(props, vm) {
		const state = reactive({
			typeList: [],
			config: computed({
				get: () => {
					return vm.attrs.modelValue;
				},
				set: (val) => {
					vm.emit("update:excelConfig", val);
				},
			}),
		});
		const getTypeListMethod = () => {
			getTypeList({}).then((res) => {
				state.typeList = res.list;
			});
		};
		getTypeListMethod();
		return {
			...toRefs(state),
		};
	},
};
</script>

<style lang="less" scoped>
.table-wrap {
	// table,
	// thead,
	// tbody,
	// tr,
	// td {
	// 	padding: 0;
	// 	margin: 0;
	// }
	table {
		thead tr td {
			&.td-label {
				width: 80px;
				font-weight: 500;
			}
		}
		tbody {
			max-height: 400px;
			overflow-y: auto;
			tr {
				&:first-child {
					td {
						border-top: solid 1px #e2e2e2;
					}
				}
			}
			td {
				border-bottom: solid 1px #e2e2e2;
				border-right: solid 1px #e2e2e2;
				text-align: center;
				padding: 0 7px;

				&:first-child {
					border-left: solid 1px #e2e2e2;
				}
			}
		}
	}
}
</style>
