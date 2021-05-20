import { post } from "./index";
const baseurl = "/form/formdata/";
// 获取菜单

// 获取页面配置
export const getPageConfig = (params) => {
	return post(baseurl + "field-config/", params);
};
// 获取页面数据
export const getTableData = (params) => {
	return post(baseurl + "target-detail/", params);
};

// 获取所有数据页
export const getDatabaseList = (params) => {
	return post(baseurl + "acquire-template/", params);
};
