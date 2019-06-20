'use strict';
const Sequelize = require('sequelize');
const Crypto = require('crypto');

/**
 * User Schema
 */
module.exports = function (sequelize, DataTypes) {
	const User = sequelize.define('user', {
		name: {
			type: Sequelize.STRING
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: ''
		},
		password: {
			type: Sequelize.STRING
		},
		salt: {
			type: Sequelize.STRING
		},
		roles: {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: 'user'
		},
		resetPasswordToken: {
			type: Sequelize.STRING
		},
		resetPasswordExpires: {
			type: Sequelize.DATE
		}
	}, {
		freezeTableName: true // Use this configuration to freeze table name i.e. sequelize will not append 's' after table name.
	});

	User.associate = function (models) {

	};
	// /**
	//  * Create instance method for hashing a password
	//  */
	User.prototype.hashPassword = function (password) {
		if (this.salt && password) {
			return Crypto.pbkdf2Sync(password, Buffer.from(this.salt, 'base64'), 10000, 64, 'sha512').toString('base64');
		} else {
			return password;
		}
	};

	// /**
	//  * Create instance method for authenticating user
	//  */
	User.prototype.authenticate = function (password) {
		return this.password === this.hashPassword(password);
	};

	// /**
	//  * Hook a pre save method to hash the password
	//  */
	// User.beforeCreate(function(model) {
	//     if (model.password && model.password.length >= 6) {
	//         model.salt = Crypto.randomBytes(16).toString('base64');
	//         model.password = model.hashPassword(model.password);
	//     }
	// });
	User.beforeSave(function (model) {
		if (model.password && model.password.length >= 6) {
			model.salt = Crypto.randomBytes(16).toString('base64');
			model.password = model.hashPassword(model.password);
		}
	});

	User.sync({
		force: false
	}).then(() => {
		// Table created
		return true;
	});
	return User;
};
