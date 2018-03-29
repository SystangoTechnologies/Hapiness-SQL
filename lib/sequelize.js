'use strict';

const Sequelize = require('sequelize');
const fs = require('fs-extra');
const path = require('path');

exports.plugin = {  
    register: (plugin, options) => {
        try {
            const sequelize = new Sequelize(options.database, options.username, options.password, {
                host: options.host,
                port: options.port,
                dialect: options.dialect,
                pool: {
                    max: 5,
                    min: 0,
                    idle: 10000
                }
            });
    
            sequelize
                .authenticate()
                .then(() => {
                    console.log('Connection has been established successfully.');
                })
                .catch(err => {
                    console.error('Unable to connect to the database:', err);
                });
    
            var db = {};
            var readPath = path.join(__dirname, '../models');
            fs.readdirSync(readPath)
                .filter(function(file) {
                    return (file.indexOf('.') !== 0) && (file !== 'index.js');
                })
                .forEach(function(file) {
                    var model = sequelize.import(path.join(readPath, file));
                    db[model.name] = model;
                });
            Object.keys(db).forEach(function(modelName) {
                if ('associate' in db[modelName]) {
                    db[modelName].associate(db);
                }
            });
            db.sequelize = sequelize;
            db.Sequelize = Sequelize;
            //Return value on the basis of key.
            exports.get = function(key) {
                return db[key];
            };
        } catch (error) {
            console.log('error', error);
        }
    },
    pkg: require('../package.json'),
    name : 'sequelize'
}; 