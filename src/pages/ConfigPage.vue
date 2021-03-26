<template>
	<div class="page-header common-space">
		<div class="left"><i>青塔出品</i></div>
		<div class="right">
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
		<div class="com-list-wrap">
			<custom-drag
				v-model="list"
				item-key="name"
				:group="{ name: 'com', pull: 'clone', put: false }"
			>
				<template #default="{ element }">
					<div class="com-item">
						<component :is="element.name" class="com"></component>
						<p class="com-item-label">{{ element.label }}</p>
					</div>
				</template>
			</custom-drag>
		</div>
		<div class="canvas-wrap">
			<div class="form-container">
				<custom-drag
					v-model="formList"
					item-key="name"
					class="form-list"
					:group="{ name: 'com', pull: false, put: true }"
				>
					<template #default="{ element }" class="form-item">
						<div class="form-item">
							<component
								:is="element.name"
								class="form-item-content"
							></component>
							<p class="form-item-label">{{ element.label }}</p>
						</div>
					</template>
				</custom-drag>
			</div>
		</div>
	</div>
</template>

<script>
import { tInput, tDatePicker, tSelect } from "../components/components";
import { comList } from "./ComponentList";
import CustomDrag from "../modules/CustomDrag.vue";

export default {
	name: "ConfigPage",
	components: { CustomDrag, tInput, tDatePicker, tSelect },
	data() {
		return {
			userName: "kiter",
			list: comList,
			formList: [],
			tableList: [],
		};
	},
};
</script>

<style lang="less" scoped>
.page-header {
	height: 40px;
	padding: 0 80px;
	border-bottom: 1px solid #dcdfe6;
}

.page-center {
	height: calc(100% - 55px);
	margin-top: 15px;
	display: flex;
	padding: 0 30px;

	.menu-list-wrap,
	.com-list-wrap,
	.canvas-wrap {
		height: 100%;
		overflow-y: auto;
	}

	.com-list-wrap {
		flex: 0 0 200px;
		display: inline-block;
		padding-right: 20px;
		border-right: 1px solid #dcdfe6;
		.com-item {
			position: relative;
			height: 40px;
			margin: 20px 0;
			cursor: move;

			&:first-child {
				margin-top: 0;
			}

			&:hover {
				box-shadow: 0 0 6px 3px rgb(64 158 255 / 60%);
			}

			.com {
				opacity: 0.9;
				width: 100%;
			}

			.com-item-label {
				position: absolute;
				width: 100%;
				height: 100%;
				text-align: center;
				line-height: 40px;
				top: 0;
			}
		}
	}

	.canvas-wrap {
		flex: 1;
		margin-left: 20px;
		.form-container {
			.form-list {
				display: flex;
				flex-wrap: wrap;
				/deep/ .list-group-item {
					margin-right: 10px;
					margin-bottom: 10px;
					&:last-child {
						margin-right: 0;
					}
				}
				.form-item {
					height: 40px;
					position: relative;
					.form-item-label {
						position: absolute;
						height: 40px;
						text-align: center;
						width: 100%;
						line-height: 40px;
						top: 0;
					}
				}
			}
		}
		.table-container {
			.table-list-wrap {
				display: flex;
				flex-wrap: wrap;
				.table-wrap {
					width: 50%;
					margin-bottom: 10px;
				}
			}
		}
	}
}
</style>

<style lang="less" scoped>
/deep/ .el-input,
/deep/ .el-input__inner {
	width: 170px !important;
}
</style>
