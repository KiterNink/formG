<template>
	<h1>模板管理</h1>
	<div class="template-manage-wrap">
		<ul class="template-list">
			<el-tooltip effect="light" content="新增数据" placement="top">
				<li class="template-item add-database" @click="addDatabase">
					<!-- 添加数据 -->
				</li>
			</el-tooltip>
			<el-tooltip effect="light" content="新增模板" placement="top">
				<li class="template-item add-template" @click="addPage">
					<!-- 添加模板 -->
				</li>
			</el-tooltip>
			<li
				class="template-item"
				v-for="(item, index) of pageList"
				:key="index"
				@click.stop="handlePage('view', item.id)"
			>
				<ul class="template-item-center">
					<li
						class="button-item"
						@click="handlePage('view', item.id)"
					>
						<i class="el-icon-view"></i>
					</li>
					<li
						class="button-item"
						@click="handlePage('delete', item.id)"
					>
						<i class="el-icon-delete"></i>
					</li>
				</ul>
				<p class="template-item-name">{{ item.name }}</p>
			</li>
		</ul>
	</div>
	<!-- <el-dialog
		v-model="visible"
		title="新建表单"
		center
		@close="closeDialog"
		width="50%"
		:close-on-click-modal="false"
	>
		<el-radio-group v-model="tlte">
			<el-radio
				:label="item.value"
				v-for="item of templateList"
				:key="item.value"
				>{{ item.label }}
				<p><img :src="item.img" alt="" class="template-img" /></p>
			</el-radio>
		</el-radio-group>
		<template #footer>
			<el-button type="primary" plain @click="closeDialog"
				>取消</el-button
			>
			<el-button type="primary" @click="goConfig">确定</el-button>
		</template>
	</el-dialog> -->
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import imgExcel from "../assets/img/icon-excel.png";
import imgEmpty from "../assets/img/icon-empty.png";
import { getTemplates } from "../api/templates";
export default {
	name: "TemplateManage",
	setup() {
		const router = useRouter();
		const state = reactive({
			pageList: [],
			visible: false,
			templateList: [
				{
					label: "空白表单",
					value: "FormList",
					img: imgEmpty,
				},
				{
					label: "从Excel创建",
					value: "Excel",
					img: imgExcel,
				},
			],
			tlte: "FormList",
		});
		const addPage = () => {
			// state.visible = true;
			router.push({ name: "config", query: { template: "FormList" } });
		};
		const handlePage = (type, id) => {
			// if (type === "view") {
			// 	router.push({ name: "config", query: { id } });
			// } else {
			// }
		};
		const closeDialog = () => {
			state.visible = false;
		};
		const goConfig = () => {
			router.push({ name: "config", query: { template: state.tlte } });
		};
		const getData = () => {
			// const params = {};
			// getTemplates(params).then((res) => {
			// 	state.pageList = res.list;
			// });
		};
		const addDatabase = () => {
			router.push({ name: "Excel" });
		};
		getData();
		return {
			...toRefs(state),
			handlePage,
			addPage,
			closeDialog,
			goConfig,
			getData,
			addDatabase,
		};
	},
};
</script>

<style lang="less" scoped>
h1 {
	padding: 0 80px;
}
.template-manage-wrap {
	padding: 0 80px;
	.template-list {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		.template-item {
			width: 140px;
			height: 140px;
			margin-right: 10px;
			margin-bottom: 10px;
			background: #fff;
			border-radius: 4px;
			cursor: pointer;
			&:hover {
				box-shadow: 0 0 10px 0 #999;
			}
			&.add-template {
				display: flex;
				align-items: center;
				justify-content: center;
				background: url("../assets/img/icon-empty.png") no-repeat;
			}
			&.add-database {
				background: url("../assets/img/icon-excel.png") no-repeat;
			}
			&-center {
				background: #3e74ff;
				height: 100px;
				display: flex;
				align-items: center;
				justify-content: center;
				.button-item {
					width: 35px;
					height: 35px;
					border: 1px solid #fff;
					border-radius: 35px;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #fff;
					font-size: 24px;
					margin-right: 7px;
					&:last-child {
						margin-right: 0;
					}
					&:hover {
						box-shadow: 0 0 10px 0 #999;
					}
				}
			}
			&-name {
				height: 40px;
				line-height: 40px;
				text-align: center;
			}
		}
	}
}
.template-img {
	width: 70px;
	height: 70px;
	object-fit: cover;
	margin-top: 10px;
}
</style>
