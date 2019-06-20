'use strict';
const User = require('../../lib/sequelize').get('user');

/**
 *  Helper method for finding user details can be called from web and mobile api controller.
 * @param {*} userId // User Id for which details needs to be fetch.
 */
exports.findUserDetails = async (userId) => {
	return new Promise(async (resolve, reject) => {
		try {
			let userDetails = await User.findOne({
				where: {
					id: userId
				},
				attributes: {
					exclude: ['password', 'salt', 'resetPasswordToken', 'resetPasswordExpires']
				}
			});
			return resolve(userDetails);
		} catch (error) {
			return reject(error);
		}
	});
};
