'use strict';
const helpers = require('../helpers');
const passport = require('passport');
const config = require('../config');
const helper = require('../helpers');

module.exports = () => {
    const routes = {
        'get': {
            '/': (req, res, next) => {
                res.render('login', {
                    pageTitle: 'My Login Page'
                });
            },
            '/rooms': [helpers.isAuthenticated, (req, res, next) => {
                res.render('rooms', {
                    user: req.user,
                    host: config.host,
                });
            }],
            '/chat/:id': [helpers.isAuthenticated, (req, res, next) => {
                let getRoom = helpers.findRoomById(req.app.locals.chatrooms, req.params.id);
                if( getRoom === undefined ) return next();
                else {
                    res.render('chatroom', {
                        user: req.user,
                        host: config.host,
                        room: getRoom.room,
                        roomID: getRoom.roomID,
                    });
                }
            }],
            '/auth/facebook': passport.authenticate('facebook'),
            '/auth/facebook/callback': passport.authenticate('facebook', {
                successRedirect: '/rooms',
                failureRedirect: '/'
            }),
            '/logout': (req, res, next) => {
                req.logout();
                res.redirect('/');
            }
        },
        'post': {

        },
        'NA': (req, res, next) => {
            res.status(404).render('404');
        },
    };

    return helpers.route(routes);
};