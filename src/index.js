import color from 'color';
import colourNames from './lib/colourNames';
import toShorthand from './lib/toShorthand';
import * as ctype from './lib/colourType';
import trim from './lib/stripWhitespace';
import zero from './lib/trimLeadingZero';

const filterColor = callback => Object.keys(colourNames).filter(callback);
const shorter = (a, b) => (a && a.length < b.length ? a : b).toLowerCase();

export default (colour, opts = {}) => {
    if (ctype.isRGBorHSL(colour)) {
        let c;
        // Pass through invalid rgb/hsl functions
        try {
            c = color(colour);
        } catch (err) {
            return colour;
        }
        if (c.alpha() === 1) {
            // At full alpha, just use hex
            colour = c.hexString();
        } else {
            let rgb = c.rgb();
            if (
                !opts.legacy &&
                !rgb.r &&
                !rgb.g &&
                !rgb.b &&
                !rgb.a
            ) {
                return 'transparent';
            }
            let hsla = c.hslaString();
            let rgba = c.rgbString();
            return zero(trim(hsla.length < rgba.length ? hsla : rgba));
        }
    }
    if (ctype.isHex(colour)) {
        colour = toShorthand(colour.toLowerCase());
        let keyword = filterColor(key => colourNames[key] === colour)[0];
        return shorter(keyword, colour);
    } else if (ctype.isKeyword(colour)) {
        let hex = colourNames[filterColor(k => k === colour.toLowerCase())[0]];
        return shorter(hex, colour);
    }
    // Possibly malformed, just pass through
    return colour;
};
