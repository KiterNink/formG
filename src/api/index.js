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
				const result = response.data;
				if (typeof result === "object") {
					if (result.state === 0) {
						return result.data;
					} else {
						throw result.data;
					}
				} else {
					const disposition = response.headers["content-disposition"];
					return {
						data: result,
						etc: disposition.split("=")[1],
					};
				}
			} else {
				throw result.data;
			}
		})
		.catch((e) => {
			throw e;
		});
};
