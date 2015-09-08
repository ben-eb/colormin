function hexDouble(num) {
    var str = num.toString(16);
    return (str.length < 2) ? "0" + str : str;
}

function toLonghand(hex) {
    let h = hex.substring(1);
    let r = h[0];
    let g = h[1];
    let b = h[2];
    return h.length === 3 && '#' + r + r + g + g + b + b || hex;
};

export function toShorthand(hex) {
    if (hex[1] === hex[2] && hex[3] === hex[4] && hex[5] === hex[6]) {
        return '#' + hex[2] + hex[4] + hex[6];
    }
    return hex;
};

export function toHex(rgb) {
    return "#" + hexDouble(rgb[0]) + hexDouble(rgb[1]) + hexDouble(rgb[2]);
}

export function isHex(colour) {
    if (colour[0] === '#') {
        let c = toLonghand(colour).substring(1);
        return c.length === 6 && ! isNaN(parseInt(c, 16));
    }
    return false;
};
