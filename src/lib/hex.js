'use strict';

export function toShorthand (hex) {
    if (hex[1] === hex[2] && hex[3] === hex[4] && hex[5] === hex[6]) {
        return '#' + hex[2] + hex[4] + hex[6];
    }
    return hex;
};

export function toLonghand (hex) {
    let h = hex.substring(1);
    let r = h[0];
    let g = h[1];
    let b = h[2];
    return h.length === 3 && '#' + r + r + g + g + b + b || hex;
};
