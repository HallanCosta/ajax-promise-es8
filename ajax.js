
const message = {

	sigle: (element, message) => {
		element.innerHTML = message;
	},

	multiples: (element, message, callback) => {
		element.innerHTML = message;
		callback();
	}
};

const ajax = {

	post: async (url, formData, notification=false) => {

		const params =  new URLSearchParams([...new FormData(formData)]);

		if (notification) {
			console.log(`URL: ${url}.php \n FormData: ${params}`)
		}

		const myInit = {
			method: 'POST',
			body: params
		};

		const response = await fetch(url + '.php', myInit);

		const data = await response.text();

		if (notification) {
			window.alert(`Status: ${response.status} \n StatusText: ${response.statusText}`);
		}

		return data;
	},

	get: async (url, parameters='', notification=false) => {

		if (notification) {
			console.log(`URL: ${url}.php`)
			console.log(`Parameters: ${parameters}`)
			console.log('All two: ' + url + '.php?' + parameters)
		}

		const myInit = {
			method: 'GET'
		};

		const response = await fetch(url + '.php?' + parameters, myInit);

		const data = await response.text();

		if (notification) {
			window.alert(`Status: ${response.status} \n StatusText: ${response.statusText}`);
		}

		return data;

	}

};

