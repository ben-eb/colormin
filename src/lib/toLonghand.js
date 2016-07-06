export default hex => {
    if (hex.length !== 4) {
        return hex;
    }

    const r = hex[1];
    const g = hex[2];
    const b = hex[3];
    return '#' + r + r + g + g + b + b;
};
