'use strict';

import convert from 'color-convert';
import { isHex, toHex, toShorthand } from './lib/hex';
import zero from './lib/trimLeadingZero';
import { keywords, hexs } from './lib/colours';


let shorter = (a, b) => (a && a.length < b.length ? a : b).toLowerCase();

export default (colour, values) => {
    if (colour === 'rgba' || colour === 'hsla') {
        if (!values || values.length !== 4) {
            return false;
        }
        if (values[3] === 0) {
            return 'transparent';
        }
        if (values[3] === 1) {
            colour = toHex(colour === 'hsla' ? convert.hsl.rgb(values) : values);
        } else {
            let hsla, rgba;
            values[3] = zero(values[3]);
            if (colour === 'hsla') {
                rgba = convert.hsl.rgb(values);
                rgba.push(values[3]);
                hsla = values;
            } else {
                hsla = convert.rgb.hsl(values);
                hsla.push(values[3]);
                rgba = values;
            }
            hsla[1] += '%';
            hsla[2] += '%';
            return shorter('hsla(' + hsla.join() + ')', 'rgba(' + rgba.join() + ')');
        }
    } else if (colour === 'rgb' || colour === 'hsl') {
        if (!values || values.length !== 3) {
            return false;
        }
        colour = toHex(colour === 'hsl' ? convert.hsl.rgb(values) : values);
    }

    if (isHex(colour)) {
        colour = toShorthand(colour.toLowerCase());
        let keyword = hexs[colour];
        return shorter(keyword, colour);
    } else if (colour.toLowerCase() in keywords) {
        let hex = keywords[colour.toLowerCase()];
        return shorter(hex, colour);
    }
    // Possibly malformed, just pass through
    return colour;
};
