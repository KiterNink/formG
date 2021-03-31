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
