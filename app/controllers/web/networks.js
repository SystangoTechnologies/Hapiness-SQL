'use strict';
const Joi = require('joi');
const User = require('../../../lib/sequelize').get('user');

exports.connect = function(provider) {
    // Return config object for hapi route
    return {
        auth: provider,
        handler: async (request, h) => {
            try {

                if (!request.auth.isAuthenticated) {
                    request.yar.flash('success', 'Authentication failed due to: ' + request.auth.error.message);
                    h.redirect('/me/settings/networks');
                }
                // If user is signed in then connect existing account with provider
                if (request.state['Basic-auth']) {
                    delete request.auth.credentials.profile;
                    delete request.auth.credentials.query;
                    var id = request.state['Basic-auth'].id;
                    var update = {};
                    update['networks.' + provider] = request.auth.credentials;
                    var options = {
                        new: true
                    };
                    let user = await User.findOne({
                        where: { id: id },
                        attributes: ['id']
                    });
                    if (user) {
                        await User.update(update, { where: { id: id } });
                    } else {
                        await User.create(update);
                    }
                    request.cookieAuth.clear();
                    request.cookieAuth.set(user);
                    request.yar.flash('success', 'Profile successfully saved');
                    h.redirect('/me/settings/networks');
                }

            } catch (error) {
                request.yar.flash('error', error.message);
                h.redirect('/me/settings/networks');
            }

            // TODO : Signup user if not logged in 
        }
    };
};

exports.disconnect = {
    handler: async (request, h) => {
        try {
            var provider = encodeURIComponent(request.params.provider);
            var id = request.auth.credentials.id;
            var update = {

            };
            update['networks.' + provider] = '';
            let user = await User.findOne({
                where: { id: id },
                attributes: ['id']
            });
            if (user) {
                await User.update(update, { where: { id: id } });
            } else {
                await User.create(update);
            }
            request.cookieAuth.clear();
            request.cookieAuth.set(user);
            request.yar.flash('success', 'Account successfully disconnected');
            return h.redirect('/me/settings/networks');
        } catch (error) {
            request.yar.flash('error', error.message);
            return h.redirect('/me/settings/networks');
        }
    }
};
