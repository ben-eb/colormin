import test from 'ava';
import min from '..';

test('should return the smallest colour', t => {
    t.deepEqual(min('RED'), 'red', 'should lowercase keywords');
    t.deepEqual(min('#f00'), 'red', 'should convert shorthand hex to keyword');
    t.deepEqual(min('#ff0000'), 'red', 'should convert longhand hex to keyword');
    t.deepEqual(min('rgb(255,0,0)'), 'red', 'should convert rgb to keyword');
    t.deepEqual(min('rgba(255, 0, 0, 1)'), 'red', 'should convert fully opaque rgb to keyword');
    t.deepEqual(min('hsl(0, 100%, 50%)'), 'red', 'should convert hsl to keyword');
    t.deepEqual(min('hsla(0, 100%, 50%, 1)'), 'red', 'should convert fully oqaque hsl to keyword');
    t.deepEqual(min('hsla(0, 100%, 50%, .5)'), 'rgba(255,0,0,.5)', 'should convert translucent hsla to rgba');
    t.deepEqual(min('#FFFFFF'), '#fff', 'should convert longhand hex to shorthand, case insensitive');
    t.deepEqual(min('WHiTE'), '#fff', 'should convert keyword to hex, case insensitive');
    t.deepEqual(min('yellow'), '#ff0', 'should convert keyword to hex');
    t.deepEqual(min('rgb(12, 134, 29)'), '#0c861d', 'should convert rgb to hex');
    t.deepEqual(min('hsl(230, 50%, 40%)'), '#349', 'should convert hsl to hex');
    t.deepEqual(min('#000080'), 'navy', 'should convert another longhand hex to keyword');
    t.deepEqual(min('rgba(199, 190, 179, 0.8)'), 'hsla(33,15%,74%,.8)', 'should convert rgba to hsla when shorter');
    t.deepEqual(min('rgba(0,0,0,0)'), 'transparent', 'should convert this specific rgba value to "transparent"');
    t.deepEqual(min('rgba(0,0,0,0)', {legacy: true}), 'rgba(0,0,0,0)', 'should not convert this specific rgba value to "transparent" (legacy mode)');
    t.deepEqual(min('hsla(0,0%,0%,0)'), 'transparent', 'should convert this specific hsla value to "transparent"');
    t.deepEqual(min('hsla(200,0%,0%,0)'), 'transparent', 'should convert hsla values with 0 saturation & 0 lightness to "transparent"');
    t.deepEqual(min('transparent'), 'transparent', 'should leave transparent as it is');
    t.deepEqual(min('#696969'), '#696969', 'should prefer to output hex rather than keywords when they are the same length');
    t.deepEqual(min('rgb(400,400,400)'), '#fff', 'should cap values at their maximum');
    t.deepEqual(min('hsl(400, 400%, 50%)'), 'red', 'should cap values at their maximum (2)');
    t.deepEqual(min('hsla(0, 0%, 100%, 0.5)'), 'hsla(0,0%,100%,.5)', 'should remove leading zeros');
    t.deepEqual(min('rgba(-100,0,-100,.5)'), 'rgba(0,0,0,.5)', 'should convert signed numbers');
    t.deepEqual(min('hsla(-400,50%,10%,.5)'), 'rgba(38,13,13,.5)', 'should convert signed numbers (2)');
    t.deepEqual(min('rgb(100%,100%,100%)'), '#fff', 'should convert percentage based rgb values');
    t.deepEqual(min('rgba(50%,50%,50%,0.5)'), 'hsla(0,0%,50%,.5)', 'should convert percentage based rgba values (2)');
    t.deepEqual(min('rgb(100%,100%,100%)'), '#fff', 'should convert percentage based rgba values (3)');
    t.deepEqual(min('rgba(100%,100%,100%,0.5)'), 'hsla(0,0%,100%,.5)', 'should convert percentage based rgba values (4)');
    t.deepEqual(min('rgba(100%,64.7%,0%,.5)'), 'rgba(255,165,0,.5)', 'should convert percentage based rgba values (5)');
    t.deepEqual(min('rgb(50%,23,54)'), 'rgb(50%,23,54)', 'should pass through on invalid rgb functions');
});

test('should pass through if not recognised', t => {
    t.plan(2);
    t.deepEqual(min('Unrecognised'), 'Unrecognised');
    t.deepEqual(min('inherit'), 'inherit');
});
