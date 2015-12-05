'use strict';

var Collection = function () {
    var collection = new Array();
    Object.defineProperty(collection, 'first', {
        enumerable: false,
        get: function () {
            return this[0];
        }
    });
    Object.defineProperty(collection, 'last', {
        enumerable: false,
        get: function () {
            return this[this.length - 1];
        }
    });
    Object.defineProperty(collection, 'isEmpty', {
        enumerable: false,
        get: function () {
            return this.length === 0;
        }
    });
    Object.defineProperty(collection, 'pickFirst', {
        enumerable: false,
        value: function () {
            return this.shift();
        }
    });
    Object.defineProperty(collection, 'pickLast', {
        enumerable: false,
        value: function () {
            return this.pop();
        }
    });
    Object.defineProperty(collection, 'insertFirst', {
        enumerable: false,
        value: function (element) {
            this.unshift(element);
        }
    });
    Object.defineProperty(collection, 'insertLast', {
        enumerable: false,
        value: function (element) {
            this.push(element);
        }
    });
    Object.defineProperty(collection, 'empty', {
        enumerable: false,
        value: function () {
            this.splice(0, this.length);
        }
    });
    return collection;
};

var Queue = function () {
    var collection = [];
    Object.defineProperty(collection, 'enqueue', {
        enumerable: false,
        value: function (element) {
            if (this.indexOf(element) === -1) {
                this.push(element);
            }
        }
    });
    Object.defineProperty(collection, 'dequeue', {
        enumerable: false,
        value: function () {
            return this.shift();
        }
    });
    Object.defineProperty(collection, 'empty', {
        enumerable: false,
        value: function () {
            this.splice(0, this.length);
        }
    });
    return collection;
};

var FixedArray = function (size) {
    var collection = new Array(size);
    var isActionValid = function (index) {
        if (!(index >= 0 && index < this.length)) {
            throw new RangeError('Out of range');
        }
    };
    Object.defineProperty(collection, 'length', {
        value: size,
        enumerable: false
    });
    Object.defineProperty(collection, 'insertAt', {
        enumerable: false,
        value: function (index, element) {
            isActionValid.call(this, index);
            this[index] = element;
        }
    });
    Object.defineProperty(collection, 'getAt', {
        enumerable: false,
        value: function (index) {
            isActionValid.call(this, index);
            return this[index];
        }
    });
    return collection;
};

var Set = function () {
    var collection = [];
    Object.defineProperty(collection, 'insert', {
        enumerable: false,
        value: function (element) {
            if (this.indexOf(element) === -1) {
                this.push(element);
            }
        }
    });
    Object.defineProperty(collection, 'remove', {
        enumerable: false,
        value: function (element) {
            this.splice(this.indexOf(element), 1);
        }
    });
    Object.defineProperty(collection, 'has', {
        enumerable: false,
        value: function (element) {
            return this.indexOf(element) !== -1;
        }
    });
    Object.defineProperty(collection, 'intersect', {
        enumerable: false,
        value: function (set) {
            var newSet = new Set();
            this.forEach(function (element) {
                if (set.has(element)) {
                    newSet.insert(element);
                }
            });
            return newSet;
        }
    });
    Object.defineProperty(collection, 'union', {
        enumerable: false,
        value: function (set) {
            var newSet = new Set();
            this.forEach(item => {
                newSet.insert(item);
            });
            set.forEach(item => {
                newSet.insert(item);
            });
            return newSet;
        }
    });
    Object.defineProperty(collection, 'empty', {
        enumerable: false,
        value: function () {
            this.splice(0, this.length);
        }
    });
    return collection;
};

var Map = function () {};
var PriorityQueue = function () {};

exports.Collection = Collection;
exports.Queue = Queue;
exports.FixedArray = FixedArray;
exports.Set = Set;
exports.PriorityQueue = PriorityQueue;
exports.Map = Map;
