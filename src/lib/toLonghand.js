export default hex => {
    if (hex.length !== 4) {
        return hex;
    }

    let r = hex[1];
    let g = hex[2];
    let b = hex[3];
    return '#' + r + r + g + g + b + b;
};
