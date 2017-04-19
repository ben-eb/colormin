import colourNames from './colourNames';
import toLonghand from './toLonghand';

const has = Object.prototype.hasOwnProperty;

export const isHex = colour => {
    if (colour[0] === '#') {
        let c = toLonghand(colour).substring(1);
        return c.length === 6 && ! isNaN(parseInt(c, 16));
    }
    return false;
};

export const isRGBorHSL = colour => /^(rgb|hsl)a?\(.*?\)/.test(colour);

export const isKeyword = colour => has.call(colourNames, colour.toLowerCase());
