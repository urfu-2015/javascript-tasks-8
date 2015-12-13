'use strict';

var Collection = function () {
    this.collection = [];
    this.first = undefined;
    this.last = undefined;
    this.length = 0;
    this.isEmpty = true;
};
Collection.prototype.pickFirst = function () {
    if (this.length === 0) {
        return undefined;
    }
    var result = this.collection.shift();
    this.length -= 1;
    if (this.length === 0) {
        this.isEmpty = true;
    }
    this.first = this.collection[0];
    this.last = this.collection[this.length - 1];
    return result;
};

Collection.prototype.pickLast = function () {
    if (this.length === 0) {
        return undefined;
    }
    var result = this.collection.pop();
    this.length -= 1;
    if (this.length === 0) {
        this.isEmpty = true;
    }
    this.first = this.collection[0];
    this.last = this.collection[this.length - 1];
    return result;
};

Collection.prototype.insertFirst = function (item) {
    this.collection.unshift(item);
    this.isEmpty = false;
    this.length += 1;
    this.first = this.collection[0];
    this.last = this.collection[this.length - 1];
};

Collection.prototype.insertLast = function (item) {
    this.collection.push(item);
    this.isEmpty = false;
    this.length += 1;
    this.first = this.collection[0];
    this.last = this.collection[this.length - 1];
};

Collection.prototype.empty = function (item) {
    this.collection = [];
    this.first = undefined;
    this.last = undefined;
    this.length = 0;
    this.isEmpty = true;
};

var Queue = function () {
    this.queue = [];
    this.length = 0;
};

Queue.prototype.enqueue = function (item) {
    var result = this.queue.push(item);
    this.length += 1;
    return result;
};

Queue.prototype.dequeue = function () {
    var result = this.queue.shift();
    this.length -= 1;
    return result;
};

Queue.prototype.empty = function () {
    this.queue = [];
    this.length = 0;
};

var FixedArray = function (size) {
    this.fixedArray = [];
    this.length = size;
};

FixedArray.prototype.insertAt = function (index, item) {
    if ((index >= this.length) || (index < 0)) {
        throw new RangeError();
    }
    if (typeof item === 'undefined') {
        throw new Error('Can not insert empty item');
    }
    return this.fixedArray[index] = item;
};

FixedArray.prototype.getAt = function (index) {
    if ((index >= this.length) || (index < 0)) {
        throw new RangeError();
    }
    return this.fixedArray[index];
};

var Set = function () {
    this.set = [];
    this.length = 0;
};

Set.prototype.insert = function (item) {
    if (this.set.indexOf(item) < 0) {
        this.set.push(item);
        this.length += 1;
    }
};

Set.prototype.remove = function (item) {
    var index = this.set.indexOf(item);
    if (index >= 0) {
        this.set.splice(index, 1);
        this.length -= 1;
    }
};

Set.prototype.has = function (item) {
    return this.set.indexOf(item) >= 0;
};

Set.prototype.intersect = function (set) {
    var result = new Set();
    this.set.forEach(function (item) {
        if (set.set.indexOf(item) >= 0) {
            result.insert(item);
        }
    });
    return result;
};

Set.prototype.union = function (set) {
    var result = new Set();
    this.set.forEach(function (item) {
        result.insert(item);
    });
    set.set.forEach(function (item) {
        result.insert(item);
    });
    return result;
};

Set.prototype.empty = function () {
    this.set = [];
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
