'use strict';
const helpers = require('../helpers');
const passport = require('passport');

module.exports = () => {
    const routes = {
        'get': {
            '/': (req, res, next) => {
                res.render('login', {
                    pageTitle: 'My Login Page'
                });
            },
            '/rooms': (req, res, next) => {
                res.render('rooms');
            },
            '/chat': (req, res, next) => {
                res.render('chatroom');
            },
            '/auth/facebook': passport.authenticate('facebook'),
            '/auth/facebook/callback': passport.authenticate('facebook', {
                successRedirect: '/rooms',
                failureRedirect: '/'
            })
        },
        'post': {

        },
        'NA': (req, res, next) => {
            res.status(404).render('404');
        },
    };

    return helpers.route(routes);
};