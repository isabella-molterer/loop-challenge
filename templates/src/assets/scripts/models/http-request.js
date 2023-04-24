export async function call (url, method = 'POST', data = false, convertDataToJSON = true) {
	const options = {
		method,
	};
	if (method === 'POST' && data !== false) {
		if (convertDataToJSON) {
			options.body = JSON.stringify(data);
			options.headers = {
				'Content-Type': 'application/json',
			};
		} else {
			options.body = data;
		}
	} else if (method === 'GET') {
		if (data) {
			const urlWithParameters = new URL(url);
			urlWithParameters.search = new URLSearchParams(data).toString();
			url = urlWithParameters;
		}
		options.headers = {
			Authorization: 'Bearer 0123456789',
			'Content-Type': 'application/json',
		};
	}
	const response = await fetch(url, options);
	const res = await response.json();
	return res;
}
