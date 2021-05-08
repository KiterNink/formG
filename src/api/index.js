import axios from "axios";
export const post = (url, params) => {
	return axios
		.post(url, params)
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
