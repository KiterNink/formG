<template>
	<div class="manage-container">
		<h2>基础模板</h2>
		<p class="desc-text">包括了新增模板和Excel导入两种功能</p>
		<!-- <el-divider></el-divider> -->
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
	</div>
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
.manage-container {
	padding: 40px;

	h2 {
		margin: 0;
		font-weight: 400;
		color: #1f2f3d;
	}
	.desc-text {
		margin: 14px 0;
		color: #5e6d82;
	}
	.template-manage-wrap {
		// padding: 0 80px;
		margin: 35px 0;
		.template-list {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			.template-item {
				width: 80px;
				height: 80px;
				margin-right: 50px;
				margin-bottom: 10px;
				background: #fff;
				cursor: pointer;
				&:hover {
					// box-shadow: 0 0 10px 0 #999;
					transform: scale(1.1);
				}
				&.add-template {
					display: flex;
					align-items: center;
					justify-content: center;
					background: url("../assets/img/icon-empty.png") no-repeat
						center center;
					background-size: cover;
				}
				&.add-database {
					background: url("../assets/img/icon-excel.png") no-repeat;
					background-size: cover;
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
}
</style>
