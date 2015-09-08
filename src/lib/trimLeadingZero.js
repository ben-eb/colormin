'use strict';

export default num => {
    let zero = num.toString();
    return zero[0] === '0' && zero[1] === '.' ? zero.slice(1) : zero;
}
