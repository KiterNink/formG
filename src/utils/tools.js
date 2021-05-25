export function copyObj(obj) {
	let str;
	let newobj = obj.constructor === Array ? [] : {};
	if (typeof obj !== "object") {
		return;
	} else if (window.JSON) {
		str = JSON.stringify(obj); // 系列化对象
		newobj = JSON.parse(str); // 还原
	} else {
		for (const i in obj) {
			newobj[i] = typeof obj[i] === "object" ? copyObj(obj[i]) : obj[i];
		}
	}
	return newobj;
}
// 下载表格
export const downloadBlobData = (data, title) => {
	const content = data;
	const blob = new Blob([content], { type: "application/octet-stream" });
	const fileName = title;
	if (window.navigator.msSaveOrOpenBlob) {
		window.navigator.msSaveOrOpenBlob(blob, fileName);
	} else {
		const elink = document.createElement("a");
		elink.download = fileName;
		elink.style.display = "none";
		elink.href = URL.createObjectURL(blob);
		document.body.appendChild(elink);
		elink.click();
		URL.revokeObjectURL(elink.href); // 释放URL 对象
		document.body.removeChild(elink);
	}
};
