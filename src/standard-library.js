'use strict';

var Collection = function () {
    Collection.prototype.empty.call(this);
};

Collection.prototype.pickFirst = function () {
    var first = this.first;
    if (this.length > 1) {
        this.first = this.collection[1];
        this.length--;
        this.collection.shift();
    } else {
        Collection.prototype.empty.call(this);
    }
    return first;
};

Collection.prototype.pickLast = function () {
    var last = this.last;
    if (this.length > 1) {
        this.last = this.collection[this.length - 2];
        this.length--;
        this.collection.splice(-1, 1);
    } else {
        Collection.prototype.empty.call(this);
    }
    return last;
};

Collection.prototype.insertFirst = function (item) {
    this.first = item;
    if (this.isEmpty) {
        this.last = item;
    }
    this.length++;
    this.isEmpty = false;
    this.collection.unshift(item);
};

Collection.prototype.insertLast = function (item) {
    this.last = item;
    if (this.isEmpty) {
        this.first = item;
    }
    this.length++;
    this.isEmpty = false;
    this.collection.push(item);
};

Collection.prototype.empty = function () {
    this.first = null;
    this.last = null;
    this.length = 0;
    this.isEmpty = true;
    this.collection = [];
};

var Queue = function () {
    Queue.prototype.empty.call(this);
};

Queue.prototype.enqueue = function (item) {
    this.queue.push(item);
    this.length++;
};

Queue.prototype.dequeue = function () {
    if (this.length !== 0) {
        this.length--;
        var item = this.queue[0];
        this.queue.shift();
        return item;
    }
};

Queue.prototype.empty = function () {
    this.length = 0;
    this.queue = [];
};

var FixedArray = function (size) {
    this.length = size;
    this.fixedArray = [];
};

FixedArray.prototype.insertAt = function (index, item) {
    if (item === undefined) {
        throw new Error('Argument item is not defined!');
    }
    if (index > this.length - 1) {
        throw new RangeError;
    }
    this.fixedArray[index] = item;
};

FixedArray.prototype.getAt = function (index) {
    if (index > this.length - 1) {
        throw new RangeError;
    }
    return this.fixedArray[index];
};

var Set = function () {
    Set.prototype.empty.call(this);
};

Set.prototype.insert = function (item) {
    if (!this.set.hasOwnProperty(item)) {
        this.set[item] = true;
        this.length++;
    }
};

Set.prototype.remove = function (item) {
    if (this.set.hasOwnProperty(item)) {
        delete this.set[item];
        this.length--;
    }
};

Set.prototype.has = function (item) {
    return this.set.hasOwnProperty(item);
};

Set.prototype.intersect = function (set) {
    var result = new Set();
    Object.keys(this.set).forEach(function (item) {
        if (set.set.hasOwnProperty(item)) {
            result.insert(item);
        }
    });
    return result;
};

Set.prototype.union = function (set) {
    var result = new Set();
    Object.keys(this.set).forEach(function (item) {
        result.insert(item);
    });
    Object.keys(set.set).forEach(function (item) {
        result.insert(item);
    });
    return result;
};

Set.prototype.empty = function () {
    this.length = 0;
    this.set = {};
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
