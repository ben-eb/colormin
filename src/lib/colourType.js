'use strict';

import colourNames from './colourNames';
import toLonghand from './toLonghand';

export let isHex = colour => {
    if (colour[0] === '#') {
        let c = toLonghand(colour).substring(1);
        return c.length === 6 && ! isNaN(parseInt(c, 16));
    }
    return false;
};

export let isRGBorHSL = colour => /^(rgb|hsl)a?\(.*?\)/.test(colour);

export let isKeyword = colour => {
    return ~Object.keys(colourNames).indexOf(colour.toLowerCase());
};
