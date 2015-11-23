'use strict';

var Collection = function () {
    this.elements = [];
    this.first = null;
    this.last = null;
    this.length = 0;
    this.isEmpty = true;
    this.pickFirst = function () {
        if (this.isEmpty) {
            return null;
        }
        var result = this.elements.shift();
        this.length--;
        this.first = this.elements[0];
        this.last = this.elements[this.length - 1];
        this.isEmpty = (this.length == 0);
        return result;
    };

    this.pickLast = function () {
        if (this.isEmpty) {
            return null;
        }
        var result = this.elements.pop();
        this.length--;
        this.first = this.elements[0];
        this.last = this.elements[this.length - 1];
        this.isEmpty = (this.length == 0);
        return result;
    };

    this.insertFirst = function (element) {
        this.elements.unshift(element);
        this.length++;
        this.first = this.elements[0];
        this.last = this.elements[this.length - 1];
        this.isEmpty = (this.length == 0);
    };

    this.insertLast = function (element) {
        this.elements.push(element);
        this.length++;
        this.first = this.elements[0];
        this.last = this.elements[this.length - 1];
        this.isEmpty = (this.length == 0);
    };

    this.empty = function () {
        this.elements = [];
        this.first = null;
        this.last = null;
        this.length = 0;
        this.isEmpty = true;
    };
};

var Queue = function () {
    this.elements = [];
    this.length = 0;

    this.enqueue = function (element) {
        this.elements.push(element);
        this.length++;
    };

    this.dequeue = function () {
        if (this.length == 0) {
            return null;
        }
        var result = this.elements.shift();
        this.length--;
        return result;
    };

    this.empty = function () {
        this.elements = [];
        this.length = 0;
    };
};

var FixedArray = function (size) {
    this.elements = [];
    this.length = size;
    this.insertAt = function (index, elem) {
        if (index < 0 || index >= this.length) {
            throw new RangeError('Index out of range');
        }
        this.elements[index] = elem;
    };

    this.getAt = function (index) {
        if (index < 0 || index >= this.length) {
            throw new RangeError('Index out of range');
        }
        return this.elements[index];
    };
};

var Set = function () {
    this.length = 0;
    this.elements = [];

    this.insert = function (item) {
        if (!this.has(item)) {
            this.elements.push(item);
            this.length++;
        }
    };

    this.remove = function (item) {
        var index = this.elements.indexOf(item);
        if (index != -1) {
            this.elements.splice(index, 1);
            this.length--;
        }
    };

    this.has = function (item) {
        return this.elements.indexOf(item) != -1;
    };

    this.intersect = function (another) {
        var intersection = new Set();
        this.elements.forEach(function (elem) {
            if (another.has(elem)) {
                intersection.insert(elem);
            }
        });
        return intersection;
    };

    this.union = function (another) {
        var union = new Set();
        var insertion = function (elem) {
            union.insert(elem);
        };
        this.elements.forEach(insertion);
        another.elements.forEach(insertion);
        return union;
    };

    this.empty = function () {
        this.elements = [];
        this.length = 0;
    };
};

var PriorityQueue = function () {

};

var Map = function () {

};

exports.Collection = Collection;
exports.Queue = Queue;
exports.FixedArray = FixedArray;
exports.Set = Set;
exports.PriorityQueue = PriorityQueue;
exports.Map = Map;
