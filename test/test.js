/* eslint-disable no-undef */
const utils = require('./testcases/utils');

describe('Users', () => {
	after((done) => {
		console.log('--------------------------after hook start--------------------------');
		utils.cleanDb()
			.then(function() {
				console.log('--------------------------after hook complete--------------------------');
				done();
			}).catch(function(err) {
				console.log('error in after hook: ', err);
			});
	});

	describe('Test cases', () => {
		/* Require all the test cases files here and they will be executed in the same order */

		console.log('--------------------------test cases start--------------------------');
		require('./testcases/server.js');
		require('./testcases/users.js');
		console.log('--------------------------test cases completed--------------------------');
	});
});
