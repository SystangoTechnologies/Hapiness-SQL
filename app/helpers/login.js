'use strict';
// Find Sequelize model using model name.
const User = require('../../lib/sequelize').get('user');

/**
 * // Authenticate user using username and password.
 * @param {*} username // userName
 * @param {*} password // password
 */
exports.findByCredentials = async function (username, password) {
	return new Promise(async function (resolve, reject) {
		try {
			var query = {};
			if (username.indexOf('@') > -1) {
				query.email = username.toLowerCase();
			} else {
				query.username = username.toLowerCase();
			}
			let user = await User.findOne({where: query});
			if (!user || !user.authenticate(password)) {
				return resolve({
					statusCode: 401,
					message: 'Invalid username or password'
				});
			}
			return resolve({
				statusCode: 200,
				user: user
			});
		} catch (error) {
			return reject(error);
		}
	});
};
