'use strict';

module.exports = function trimLeadingZero (str) {
    return str.replace(/0(\.\d*)/g, '$1');
};
