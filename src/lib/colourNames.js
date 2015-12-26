import colours from 'css-color-names';
import toShorthand from './toShorthand';

Object.keys(colours).forEach(c => colours[c] = toShorthand(colours[c]));
export default colours;
