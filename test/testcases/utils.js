const dotenv = require('dotenv');
dotenv.config();
const rp = require('request-promise');

module.exports = {
	// request : request,
	context: { api: '/api/v1', email: 'test@gmail.com', name: 'Test User', password: '12345678', role: 'carer' },

	cleanDb: async function() {
		const Sequelize = require('../../lib/sequelize').get('sequelize');
		console.log('--------------------------cleanup database start--------------------------');
		await Sequelize.drop();
		console.log('--------------------------cleanup database complete--------------------------');
	},

	auth: function() {

	},

	sendRequest: async function(method, url, body) {
		var options = {};
		options.method = method;
		options.url = url;

		if (body) {
			options.body = body;
		}
		options.headers = { 'content-type': 'application/json', 'Authorization': 'Bearer ' + this.context.token };
		options.json = true;

		try {
			return await rp(options);
		} catch (err) {
			console.log('Error while sending a request', err);
		}
	}
};
