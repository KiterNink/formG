import axios from "axios";
export const post = (url, params, type) => {
	let config = null;
	if (type === "formdata") {
		config = {
			headers: { "Content-Type": "multipart/form-data" },
		};
	}
	return axios
		.post(url, params, config)
		.then((response) => {
			if (response && response.data) {
				return response.data.data;
			} else {
				return response.data;
			}
		})
		.catch((e) => {
			throw e;
		});
};
export const postFormData = (url, params) => {};
