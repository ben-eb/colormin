'use strict';

import colours from 'css-color-names';
import { toShorthand } from './hex';

export let keywords = colours;
export let hexs = {};

Object.keys(colours).forEach(c => {
    colours[c] = toShorthand(colours[c])
    hexs[colours[c]] = c;
});
