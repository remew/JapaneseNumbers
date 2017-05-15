'use strict';

const assert = require('assert');
const regex = require('../regex');

function assertReg (value, fit) {
    assert.equal(regex.test(value), fit === undefined ? true : fit);
    regex.lastIndex = -1;
}

describe('#regex', () => {
    it('doesnt pass just any string', () => {
        assertReg('12345', false);
    });
    it('passes regular numbers', () => {
        assertReg('ー');
        assertReg('〇');
        assertReg('零');
        assertReg('四十二');
        assertReg('六兆五千三百十二万四千七百十');
        assertReg('千百十一兆千百十一億千百十一万千百十一');
        assertReg('一');
        assertReg('十');
        assertReg('百');
        assertReg('千');
        assertReg('一万');
        assertReg('一億');
        assertReg('一兆');
        assertReg('一京');
    });
    it('supports special cases', () => {
        assertReg('恒河沙');
        assertReg('阿僧祇');
        assertReg('那由他');
        assertReg('不可思議');
        assertReg('無量大数');
    });
    it('finds the string in text', () => {
        var searchFor = '四十二';
        var input = `hello ${searchFor}`;
        var res = [searchFor, searchFor, undefined, undefined, undefined, undefined, undefined];
        res.index = 6;
        res.input = input;
        assert.deepEqual(regex.exec(input), res);
    });
    it('is global', () => {
        assert(regex.global);
    });
});
