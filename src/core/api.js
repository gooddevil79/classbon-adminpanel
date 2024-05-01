import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

const api = axios.create({
	baseURL: baseUrl,
});

api.interceptors.request.use(
	config => {
		const token = localStorage.getItem("token");

		if (token) {
			config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
		}
		return config;
	},
	error => {
		return Promise.reject(error.response);
	}
);

api.interceptors.response.use(
	response => response,
	error => {
		switch (error?.response?.status) {
			case 401:
				location.href = "/login";
				break;
			default:
				break;
		}
		return Promise.reject(error);
	}
);

export default api;
