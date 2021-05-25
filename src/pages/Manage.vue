<template>
	<div class="manage-container">
		<div
			class="template-class"
			v-for="(item, index) of templateList"
			:key="index"
		>
			<h2>{{ item.label }}</h2>
			<p class="desc-text">{{ item.desc }}</p>
			<div class="template-manage-wrap">
				<ul class="template-list">
					<el-tooltip
						effect="light"
						:content="m.label"
						placement="top"
						v-for="(m, i) of item.list"
						:key="i"
					>
						<li
							class="template-item"
							:style="{
								background: m.background,
								backgroundSize: 'cover',
							}"
							@click="goConfig(m.route)"
						></li>
					</el-tooltip>
				</ul>
			</div>
		</div>
	</div>
	<el-dialog title="新增数据" center v-model="visible"> </el-dialog>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import imgExcel from "../assets/img/icon-excel.png";
import imgEmpty from "../assets/img/icon-empty.png";
import imgDragger from "../assets/img/img-dragger.png";
import imgSurvey from "../assets/img/survey/banner.png";
// import { getTemplates } from "../api/templates";
export default {
	name: "TemplateManage",
	setup() {
		const router = useRouter();
		const state = reactive({
			pageList: [],
			visible: false,
			templateList: [
				{
					label: "新增数据",
					desc: "包括了拖拽生成和Excel导入两种模式",
					list: [
						{
							label: "Excel导入",
							background: `url(${imgExcel}) no-repeat center center`,
							route: { name: "Excel" },
						},
						{
							label: "拖拽字段建表",
							background: `url(${imgEmpty}) no-repeat center center`,
							route: { name: "DragCreate" },
						},
					],
				},
				{
					label: "新增模板",
					desc: "基于已有的物料拖拽建立模板",
					list: [
						{
							label: "过滤查找",
							background: `url(${imgDragger}) no-repeat center center`,
							route: {
								name: "config",
								query: { template: "FormList" },
							},
						},
						{
							label: "问卷调查",
							background: `url(${imgSurvey}) no-repeat center center`,
							route: null,
						},
					],
				},
			],
			tlte: "FormList",
		});
		const goConfig = (route) => {
			if (route) {
				router.push(route);
			}
		};
		return {
			...toRefs(state),
			goConfig,
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
