'use strict';

// Social auth Logic
require('./auth')();

module.exports = {
    router: require('./routes')(),
    session: require('./session')
};