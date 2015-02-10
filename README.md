# colormin [![Build Status](https://travis-ci.org/ben-eb/colormin.svg?branch=master)](https://travis-ci.org/ben-eb/colormin) [![NPM version](https://badge.fury.io/js/colormin.svg)](http://badge.fury.io/js/colormin) [![Dependency Status](https://gemnasium.com/ben-eb/colormin.svg)](https://gemnasium.com/ben-eb/colormin)

> Turn a CSS color into its smallest representation.

Install via [npm](https://npmjs.org/package/colormin):

```
npm install colormin --save
```

## Example

```js
var colormin = require('colormin');
console.log(colormin('rgba(255, 0, 0, 1)'));

// => 'red'
```

colormin works for rgb, rgba, hsl, hsla, hex & css color keywords. See more example output in the [tests](test.js). Note that colormin does not convert invalid CSS colors; it is not a color validator itself.

## Contributing

Pull requests are welcome. If you add functionality, then please add unit tests to cover it.

## License

MIT © Ben Briggs
