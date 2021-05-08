import { post } from "./index";
const baseurl = "/form/base/";
// 更新模板
export const updateTemplate = (params) => {
	return post(baseurl + "save_template/", params);
};
// 获取所有模板项
export const getTemplates = (params) => {
	return post(baseurl + "acquire_template/", params);
};
