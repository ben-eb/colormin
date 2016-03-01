import test from 'ava';
import min from '..';

test('should return the smallest colour', t => {
    t.same(min('RED'), 'red', 'should lowercase keywords');
    t.same(min('#f00'), 'red', 'should convert shorthand hex to keyword');
    t.same(min('#ff0000'), 'red', 'should convert longhand hex to keyword');
    t.same(min('rgb(255,0,0)'), 'red', 'should convert rgb to keyword');
    t.same(min('rgba(255, 0, 0, 1)'), 'red', 'should convert fully opaque rgb to keyword');
    t.same(min('hsl(0, 100%, 50%)'), 'red', 'should convert hsl to keyword');
    t.same(min('hsla(0, 100%, 50%, 1)'), 'red', 'should convert fully oqaque hsl to keyword');
    t.same(min('hsla(0, 100%, 50%, .5)'), 'rgba(255,0,0,.5)', 'should convert translucent hsla to rgba');
    t.same(min('#FFFFFF'), '#fff', 'should convert longhand hex to shorthand, case insensitive');
    t.same(min('WHiTE'), '#fff', 'should convert keyword to hex, case insensitive');
    t.same(min('yellow'), '#ff0', 'should convert keyword to hex');
    t.same(min('rgb(12, 134, 29)'), '#0c861d', 'should convert rgb to hex');
    t.same(min('hsl(230, 50%, 40%)'), '#349', 'should convert hsl to hex');
    t.same(min('#000080'), 'navy', 'should convert another longhand hex to keyword');
    t.same(min('rgba(199, 190, 179, 0.8)'), 'hsla(33,15%,74%,.8)', 'should convert rgba to hsla when shorter');
    t.same(min('rgba(0,0,0,0)'), 'transparent', 'should convert this specific rgba value to "transparent"');
    t.same(min('rgba(0,0,0,0)', {legacy: true}), 'rgba(0,0,0,0)', 'should not convert this specific rgba value to "transparent" (legacy mode)');
    t.same(min('hsla(0,0%,0%,0)'), 'transparent', 'should convert this specific hsla value to "transparent"');
    t.same(min('hsla(200,0%,0%,0)'), 'transparent', 'should convert hsla values with 0 saturation & 0 lightness to "transparent"');
    t.same(min('transparent'), 'transparent', 'should leave transparent as it is');
    t.same(min('#696969'), '#696969', 'should prefer to output hex rather than keywords when they are the same length');
    t.same(min('rgb(400,400,400)'), '#fff', 'should cap values at their maximum');
    t.same(min('hsl(400, 400%, 50%)'), 'red', 'should cap values at their maximum (2)');
    t.same(min('hsla(0, 0%, 100%, 0.5)'), 'hsla(0,0%,100%,.5)', 'should remove leading zeros');
    t.same(min('rgba(-100,0,-100,.5)'), 'rgba(0,0,0,.5)', 'should convert signed numbers');
    t.same(min('hsla(-400,50%,10%,.5)'), 'rgba(38,13,13,.5)', 'should convert signed numbers (2)');
    t.same(min('rgb(100%,100%,100%)'), '#fff', 'should convert percentage based rgb values');
    t.same(min('rgba(50%,50%,50%,0.5)'), 'hsla(0,0%,50%,.5)', 'should convert percentage based rgba values (2)');
    t.same(min('rgb(100%,100%,100%)'), '#fff', 'should convert percentage based rgba values (3)');
    t.same(min('rgba(100%,100%,100%,0.5)'), 'hsla(0,0%,100%,.5)', 'should convert percentage based rgba values (4)');
    t.same(min('rgba(100%,64.7%,0%,.5)'), 'rgba(255,165,0,.5)', 'should convert percentage based rgba values (5)');
    t.same(min('rgb(50%,23,54)'), 'rgb(50%,23,54)', 'should pass through on invalid rgb functions');
});

test('should pass through if not recognised', t => {
    t.plan(2);
    t.same(min('Unrecognised'), 'Unrecognised');
    t.same(min('inherit'), 'inherit');
});
