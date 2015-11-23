'use strict';

var Collection = function () {
    this.values = [];
    this.first = null;
    this.last = null;
    this.length = 0;
    this.isEmpty = true;
};

Collection.prototype.pickFirst = function () {
    if (this.length === 0) {
        return null;
    }
    var first = this.values.shift();
    var newFirst = this.values[0];
    this.first = (newFirst === undefined) ? null : newFirst;
    --this.length;
    this.isEmpty = this.length === 0;
    return first;
};

Collection.prototype.pickLast = function () {
    if (this.length === 0) {
        return null;
    }
    var last = this.values.pop();
    var newLast = this.values[this.values.length - 1];
    this.last = (newLast === undefined) ? null : newLast;
    --this.length;
    this.isEmpty = this.length === 0;
    return last;
};

Collection.prototype.insertFirst = function (item) {
    this.values.unshift(item);
    this.first = item;
    if (this.length === 0) {
        this.last = item;
    }
    ++this.length;
    this.isEmpty = false;
};

Collection.prototype.insertLast = function (item) {
    this.values.push(item);
    if (this.length === 0) {
        this.first = item;
    }
    this.last = item;
    ++this.length;
    this.isEmpty = false;
};

Collection.prototype.empty = function () {
    this.values = [];
    this.first = null;
    this.last = null;
    this.length = 0;
    this.isEmpty = true;
};

var Queue = function () {
    this.values = [];
    this.length = 0;
};

Queue.prototype.enqueue = function (item) {
    this.values.push(item);
    ++this.length;
};

Queue.prototype.dequeue = function () {
    var item = this.values.shift();
    --this.length;
    return (item === undefined) ? null : item;
};

Queue.prototype.empty = function () {
    this.values = [];
    this.length = 0;
};

var FixedArray = function (size) {
    this.values = [];
    this.length = size;
};

FixedArray.prototype.insertAt = function (index, item) {
    if (index < 0 || index >= this.length) {
        throw new RangeError('Error! Out of range!');
    }
    this.values[index] = item;
};

FixedArray.prototype.getAt = function (index) {
    if (index < 0 || index >= this.length) {
        throw new RangeError('Error! Out of range!');
    }
    return this.values[index];
};

var Set = function () {
    this.values = [];
    this.length = 0;
};

Set.prototype.insert = function (item) {
    if (this.values.indexOf(item) < 0) {
        this.values.push(item);
        ++this.length;
    }
};

Set.prototype.remove = function (item) {
    if (this.values.indexOf(item) < 0) {
        throw new Error('Error! No element in set!');
    }
    this.values.splice(this.values.indexOf(item), 1);
    --this.length;
};

Set.prototype.has = function (item) {
    return (this.values.indexOf(item) >= 0);
};

Set.prototype.intersect = function (set) {
    var result = new Set();
    this.values.forEach(function (item) {
        if (set.has(item)) {
            result.insert(item);
        }
    });
    return result;
};

Set.prototype.union = function (set) {
    var result = new Set();
    this.values.forEach(function (item) {
        result.insert(item);
    });
    set.values.forEach(function (item) {
        result.insert(item);
    });
    return result;
};

Set.prototype.empty = function () {
    this.values = [];
    this.length = 0;
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
