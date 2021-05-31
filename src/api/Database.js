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
	return post(baseurl + "acquire-targets/", params);
};
// 编辑数据
/**
 *
 * @param {type} 1:添加一行或多行，每一行以array呈现，2:导入excel
 * @param {cover} 导入excel时是否覆盖
 * @param {id} 页面id
 * @param {list} 数据
 * @param {file} excel文件
 * @returns
 */
export const uploadData = (params) => {
	return post(baseurl + "upload-data/", params, "formdata");
};
export const modifyTable = (params) => {
	return post(baseurl + "upload-data/", params);
};
export const deleteData = (params) => {
	return post(baseurl + "delete-data/", params);
};
