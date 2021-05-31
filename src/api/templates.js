import { post } from "./index";
const baseurl = "form/formdata/";
// const baseurl = "template/";
// 更新模板
export const updateTemplate = (params) => {
	return post(baseurl + "save_template/", params);
};
// 获取所有模板项
export const getTemplates = (params) => {
	return post(baseurl + "acquire-templates/", params);
};
// 导入excel
export const postExcel = (params) => {
	return post(baseurl + "upload-excel/", params, "formdata");
};
export const downloadExcel = (params) => {
	return post(baseurl + "download-data/", params, "blob");
};
// 保存excel配置
export const saveConfig = (params) => {
	return post(baseurl + "create-form/", params);
};

// 获取所有的字段类型
export const getTypeList = (params) => {
	return post(baseurl + "field-type/", params);
};

export const previewTemplate = (params) => {
	return post(baseurl + "preview/", params);
};
