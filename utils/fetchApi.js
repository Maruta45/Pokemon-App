/** @format */

import axios from 'axios';

axios.defaults.baseURL = 'https://pokeapi.co/api/v2/';
const fetchApi = async (url, method, body) => {
	var config = {
		method,
		url: url,
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
	};

	const response = await axios(config);
	return response.data;
};

export default fetchApi;
