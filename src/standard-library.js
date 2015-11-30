'use strict';

var Collection = function () {
    this.collection = [];
    this.first = null;
    this.last = null;
    this.isEmpty = true;
    Object.defineProperty(this, 'length', {
        get: function () {
            return this.collection.length;
        }
    });
};

Collection.prototype.insertFirst = function (e) {
    this.collection.unshift(e);
    this.first = e;
    this.last = this.collection[this.length - 1];
    this.isEmpty = false;
};

Collection.prototype.insertLast = function (e) {
    this.collection.push(e);
    this.first = this.collection[0];
    this.last = e;
    this.isEmpty = false;
};

Collection.prototype.pickFirst = function () {
    var e = this.collection.shift();
    this.first = this.collection[0];
    this.last = this.collection[this.length - 1];;
    this.isEmpty = this.length === 0;
    return e;
};

Collection.prototype.pickLast = function () {
    var e = this.collection.pop();
    this.first = this.collection[0];
    this.last = this.collection[this.length - 1];
    this.isEmpty = this.length === 0;
    return e;
};

Collection.prototype.empty = function () {
    this.collection = [];
    this.first = null;
    this.last = null;
    this.isEmpty = true;
};

var Queue = function () {
    this.queue = [];
    Object.defineProperty(this, 'length', {
        get: function () {
            return this.queue.length;
        }
    });
};

Queue.prototype.enqueue = function (item) {
    this.queue.push(item);
};

Queue.prototype.dequeue = function () {
    return this.queue.shift();
};

Queue.prototype.empty = function () {
    this.queue = [];
};

var FixedArray = function (size) {
    if ((size ^ 0) === Math.abs(size) && typeof size === 'number') {
        this.array = [];
        this.length = size;
    } else {
        throw new Error('unvalid size');
    }
};

FixedArray.prototype.insertAt = function (index, item) {
    if (index < this.length && index >= 0) {
        this.array[index] = item;
    } else {
        throw new RangeError();
    }
};

FixedArray.prototype.getAt = function (index) {
    if (index < this.length && index >= 0) {
        return this.array[index];
    } else {
        throw new RangeError();
    }
};

var Set = function () {
    this.set = [];
    Object.defineProperty(this, 'length', {
        get: function () {
            return this.set.length;
        }
    });
};

Set.prototype.insert = function (item) {
    if (!this.has(item)) {
        this.set.push(item);
    }
};

Set.prototype.remove = function (item) {
    var i = this.set.indexOf(item);
    if (i >= 0) {
        this.set.splice(i, 1);
    }
};

Set.prototype.has = function (item) {
    return this.set.indexOf(item) >= 0;
};

Set.prototype.intersect = function (set) {
    var intrs = new Set();
    for (var i = 0; i < set.length; i++) {
        if (this.set.indexOf(set.set[i]) >= 0) {
            intrs.insert(set.set[i]);
        }
    }
    return intrs;
};

Set.prototype.union = function (set) {
    var union = new Set();
    union.set = this.set.concat();
    for (var i = 0; i < set.length; i++) {
        union.insert(set.set[i]);
    }
    return union;
};

Set.prototype.empty = function () {
    this.set = [];
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
