'use strict';

export default hex => {
    let h = hex.substring(1);
    let r = h[0];
    let g = h[1];
    let b = h[2];
    return h.length === 3 && '#' + r + r + g + g + b + b || hex;
};
