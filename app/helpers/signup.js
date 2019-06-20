'use strict';
const User = require('../../lib/sequelize').get('user');

/**
 * Sign up user.
 * @param {*} userData User data object.
 */
exports.signUpUser = async function (userData) {
	return new Promise(async function (resolve, reject) {
		try {
			let data = await isUserAlreadyExist(userData.email);
			if(data) {
				return resolve({statusCode: 409, message: 'User already exist'});
			}else{
				let user = new User(userData);
				let savedUser = await user.save();
				return resolve({statusCode: 201, message: 'Sign up successfully', user: savedUser});
			}
		} catch (error) {
			return reject(error);
		}
	});
};

/**
 * Check whether user exist with this email.
 * @param {*} email EmailId to check the user.
 */
async function isUserAlreadyExist(email) {
	return new Promise(async function (resolve, reject) {
		try {
			var query = {};
			query.email = email.toLowerCase();
			let user = await User.findOne({where: query});
			if (user) {
				return resolve(user);
			}
			return resolve();
		} catch (error) {
			return reject(error);
		}
	});
}
