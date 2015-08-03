'use strict';

export default hex => {
    let h = hex.substring(1);
    let [r, g, b] = h;
    return h.length === 3 && '#' + r + r + g + g + b + b || hex;
};
