'use strict';

var colourNames = require('./lib/colourNames');
var toShorthand = require('./lib/toShorthand');
var stripWhitespace = require('./lib/stripWhitespace');
var trimLeadingZero = require('./lib/trimLeadingZero');
var ctype = require('./lib/colourType');
var color = require('color');

function filterColours (callback) {
    return Object.keys(colourNames).filter(callback);
}

function colormin (colour) {
    if (ctype.isRGBorHSL(colour)) {
        var c = color(colour);
        if (c.alpha() === 1) {
            // At full alpha, just use hex
            colour = c.hexString();
        } else {
            var rgb = c.rgb();
            if (!rgb.r && !rgb.g && !rgb.b && !rgb.a) {
                return 'transparent';
            }
            var hsla = c.hslaString();
            var rgba = c.rgbString();
            return trimLeadingZero(stripWhitespace(hsla.length < rgba.length ? hsla : rgba));
        }
    }
    if (ctype.isHex(colour)) {
        colour = toShorthand(colour.toLowerCase());
        var keyword = filterColours(function (key) {
            return colourNames[key] === colour;
        })[0];
        return (keyword && keyword.length < colour.length ? keyword : colour).toLowerCase();
    } else if (ctype.isKeyword(colour)) {
        var hex = colourNames[filterColours(function (key) {
            return key === colour.toLowerCase();
        })[0]];
        return (hex && hex.length < colour.length ? hex : colour).toLowerCase();
    }
    // Possibly malformed, just pass through
    return colour;
}

module.exports = colormin;
