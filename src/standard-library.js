'use strict';

var Collection = function () {
    this.empty();
};

Collection.prototype.pickFirst = function () {
    this.length--;
    if (this.length == 0) {
        this.isEmpty = true;
        this.first = undefined;
    } else {
        this.first = this.storage[1];
    }
    return this.storage.shift();
};

Collection.prototype.pickLast = function () {
    this.length--;
    if (this.length == 0) {
        this.isEmpty = true;
        this.first = undefined;
    } else {
        this.first = this.storage[this.length - 1];
    }
    return this.storage.pop();
};

Collection.prototype.insertFirst = function (element) {
    if (this.length === 0) {
        this.last = element;
        this.isEmpty = false;
    }
    this.length++;
    this.storage.unshift(element);
    this.first = element;
};

Collection.prototype.insertLast = function (element) {
    if (this.length === 0) {
        this.first = element;
        this.isEmpty = false;
    }
    this.length++;
    this.storage.push(element);
    this.last = element;
};

Collection.prototype.empty = function () {
    this.storage = [];
    this.first = undefined;
    this.last = undefined;
    this.length = 0;
    this.isEmpty = true;
};

var Queue = function () {
    Collection.call(this);
};

Queue.prototype = Object.create(Collection.prototype);
Queue.prototype.constructor = Queue;

Queue.prototype.enqueue = function (item) {
    this.insertLast(item);
};

Queue.prototype.dequeue = function () {
    return this.pickFirst();
};

var FixedArray = function (size) {
    this.length = size;
    this.storage = [];
};

FixedArray.prototype.insertAt = function (index, item) {
    if (index >= this.length || index < 0) {
        throw new RangeError();
    }
    this.storage[index] = item;
};

FixedArray.prototype.getAt = function (index) {
    if (index >= this.length || index < 0) {
        throw new RangeError();
    }
    return this.storage[index];
};

var Set = function () {
    this.empty();
};

Set.prototype.insert = function (item) {
    if (this.has(item)) {
        return;
    }
    this.storage.push(item);
    this.length++;
};

Set.prototype.remove = function (item) {
    if (!this.has(item)) {
        return;
    }
    this.storage.splice(this._indexOf(item), 1);
    this.length--;
};

Set.prototype.has = function (item) {
    return this._indexOf(item) === -1 ? false : true;
};

Set.prototype._indexOf = function (item) {
    for (var i = 0; i < this.length; i++) {
        if (this.storage[i] === item) {
            return i;
        }
    }
    return -1;
};

Set.prototype.intersect = function (set) {
    var resultSet = new Set();
    for (var i = 0; i < this.length; i++) {
        if (set.has(this.storage[i])) {
            resultSet.insert(this.storage[i]);
        }
    }
    for (i = 0; i < set.length; i++) {
        if (this.has(set.storage[i])) {
            resultSet.insert(set.storage[i]);
        }
    }
    return resultSet;
};

Set.prototype.union = function (set) {
    var resultSet = new Set();
    for (var i = 0; i < this.length; i++) {
        resultSet.insert(this.storage[i]);
    }
    for (i = 0; i < set.length; i++) {
        resultSet.insert(set.storage[i]);
    }
    return resultSet;
};

Set.prototype.empty = function () {
    this.storage = [];
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
