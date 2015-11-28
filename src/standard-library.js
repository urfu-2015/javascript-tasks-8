'use strict';

var Collection = function () {
    this.collection = [];
    this.first = null;
    this.last = null;
    this.length = 0;
    this.isEmpty = true;
};

Collection.prototype.insertFirst = function (e) {
    this.collection.unshift(e);
    this.first = e;
    this.length++;
    this.last = this.collection[this.length - 1];
    this.isEmpty = this.length === 0;
};

Collection.prototype.insertLast = function (e) {
    this.collection.push(e);
    this.first = this.collection[0];
    this.length++;
    this.last = e;
    this.isEmpty = this.length === 0;
};

Collection.prototype.pickFirst = function () {
    var e = this.collection.shift();
    this.first = this.collection[0];
    this.length--;
    this.last = this.collection[this.length - 1];;
    this.isEmpty = this.length === 0;
    return e;
};

Collection.prototype.pickLast = function () {
    var e = this.collection.pop();
    this.first = this.collection[0];
    this.length--;
    this.last = this.collection[this.length - 1];
    this.isEmpty = this.length === 0;
    return e;
};

Collection.prototype.empty = function () {
    this.collection = [];
    this.first = null;
    this.length = 0;
    this.last = null;
    this.isEmpty = true;
};

var Queue = function () {
    this.queue = [];
    this.length = 0;
};

Queue.prototype.enqueue = function (item) {
    this.queue.push(item);
    this.length++;
};

Queue.prototype.dequeue = function () {
    this.length--;
    return this.queue.shift();
};

Queue.prototype.empty = function () {
    this.queue = [];
    this.length = 0;
};

var FixedArray = function (size) {
    this.array = [];
    this.length = size;
};

FixedArray.prototype.insertAt = function (index, item) {
    if (index < this.length) {
        this.array[index] = item;
    } else {
        throw new RangeError();
    }
};

FixedArray.prototype.getAt = function (index) {
    if (index < this.length) {
        return this.array[index];
    } else {
        throw new RangeError();
    }
};

var Set = function () {
    this.set = [];
    this.length = 0;
};

Set.prototype.insert = function (item) {
    var i = this.set.indexOf(item);
    if (i < 0) {
        this.length++;
        this.set.push(item);
    }
};

Set.prototype.remove = function (item) {
    var i = this.set.indexOf(item);
    if (i >= 0) {
        this.set.splice(i, 1);
        this.length--;
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
    union.length = this.length;
    for (var i = 0; i < set.length; i++) {
        union.insert(set.set[i]);
    }
    return union;
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
