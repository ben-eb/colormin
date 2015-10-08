'use strict';

import convert from 'colr-convert';
import keywords from 'css-color-names';
import dropLeadingZero from './lib/drop-leading-zero';
import {is as isHex, toShorthand, toLonghand} from './lib/hex';
let hexes = {};
let round = Math.round;

Object.keys(keywords).forEach(keyword => hexes[keywords[keyword]] = keyword);

let shorter = (a, b) => (a && a.length < b.length ? a : b);

export default function (name, args) {
    var word = name.toLowerCase();
    if (word === 'rgb' || word === 'rgba' || word === 'hsl' || word === 'hsla') {
        if (!Array.isArray(args)) {
            throw Error('colormin: unexpected `' + word + '` function arguments');
        }
        if (args.length > 2) {
            args[0] = parseInt(args[0], 10);
            args[1] = parseInt(args[1], 10);
            args[2] = parseInt(args[2], 10);
            if (args.length > 3) {
                args[3] = parseFloat(args[3]);
            }
        }
        if (word === 'rgba' || word === 'hsla') {
            if (args[3] === 0) {
                return 'transparent';
            } else if (args[3] === 1) {
                word = word.slice(0, 3);
            } else {
                args[3] = dropLeadingZero(args[3]);
            }
        }
        if (word === 'hsl') {
            word = 'rgb';
            args = convert.hsl.rgb(args);
            args[0] = round(args[0]);
            args[1] = round(args[1]);
            args[2] = round(args[2]);
        }
        if (word === 'rgb') {
            word = convert.rgb.hex(args);
        } else {
            let rgba, hsla;
            // alpha conversion
            if (word === 'rgba') {
                rgba = args;
                hsla = convert.rgb.hsl(args);
                hsla[0] = round(hsla[0]);
                hsla[1] = round(hsla[1]);
                hsla[2] = round(hsla[2]);
                hsla.push(args[3]);
            } else {
                hsla = args;
                rgba = convert.hsl.rgb(args);
                rgba[0] = round(rgba[0]);
                rgba[1] = round(rgba[1]);
                rgba[2] = round(rgba[2]);
                rgba.push(args[3]);
            }
            hsla[1] = hsla[1] + '%';
            hsla[2] = hsla[2] + '%';
            return shorter(`hsla(${hsla.join()})`, `rgba(${rgba.join()})`);
        }
    }

    if (isHex(word)) {
        word = toLonghand(word);
        if (word in hexes) {
            return shorter(toShorthand(word), hexes[word]);
        }
        return toShorthand(word);
    }

    if (word in keywords) {
        return shorter(word, toShorthand(keywords[word]));
    }

    return name;
};
