'use strict';

var Collection = function () {
    this.collection = [];
    this.length = 0;
    this.first = null;
    this.last = null;
    this.isEmpty = true;
};
Collection.prototype.pickFirst = function () {
    this.length -= 1;
    if (this.length === 0) {
        this.isEmpty = true;
    }
    var firstItem = this.collection.shift();
    this.last = this.collection[this.collection.length - 1];
    this.first = this.collection[0];
    return firstItem;

};
Collection.prototype.pickLast = function () {
    this.length -= 1;
    if (this.length === 0) {
        this.isEmpty = true;
    }
    var lastItem = this.collection.pop();
    this.last = this.collection[this.collection.length - 1];
    this.first = this.collection[0];
    return lastItem;
};
Collection.prototype.insertFirst = function (item) {
    this.length += 1;
    if (this.length != 0) {
        this.isEmpty = false;
    }
    this.collection.unshift(item);
    this.last = this.collection[this.collection.length - 1];
    this.first = this.collection[0];
};
Collection.prototype.insertLast = function (item) {
    this.length += 1;
    if (this.length != 0) {
        this.isEmpty = false;
    }
    this.collection.push(item);
    this.last = this.collection[this.collection.length - 1];
    this.first = this.collection[0];
};
Collection.prototype.empty = function (item) {
    this.isEmpty = true;
    this.length = 0;
    this.first = null;
    this.last = null;
    this.collection = [];
};
var Queue = function () {
    this.queue = [];
    this.length = 0;
};
Queue.prototype.enqueue = function (item) {
    this.length += 1;
    this.queue.push(item);
};
Queue.prototype.dequeue = function () {
    this.length -= 1;
    return this.queue.shift();
};
Queue.prototype.empty = function () {
    this.length = 0;
    this.queue = [];
};
var FixedArray = function (size) {
    this.fixedArray = [];
    for (var i = 0;i < size;i++) {
        this.fixedArray[i] = null;
    }
    this.length = size;
};
FixedArray.prototype.insertAt = function (index, item) {
    if (index >= this.length) {
        throw new RangeError();
    }
    this.fixedArray[index] = item;
};
FixedArray.prototype.getAt = function (index) {
    if (index >= this.length) {
        throw new RangeError();
    }
    return this.fixedArray[index];
};
var Set = function () {
    this.set = [];
    this.length = 0;
};
Set.prototype.insert = function (item) {
    var existItem = this.set.indexOf(item);
    if (existItem == -1) {
        this.set.push(item);
        this.length += 1;
    }
};
Set.prototype.remove = function (item) {
    var indexToDelete = this.set.indexOf(item);
    if (indexToDelete != -1) {
        this.set.splice(indexToDelete, 1);
        this.length -= 1;
    }
};
Set.prototype.has = function (item) {
    return this.set.indexOf(item) >= 0;
};
Set.prototype.intersect = function (set) {
    var resultSet = new Set();
    for (var i = 0;i < set.length;i++) {
        if (this.set.indexOf(set.set[i]) != -1) {
            resultSet.insert(set.set[i]);
        }
    }
    return resultSet;
};
Set.prototype.union = function (set) {
    var resultSet = new Set();
    for (var i = 0;i < this.length; i++) {
        resultSet.insert(this.set[i]);
    }
    for (var i = 0;i < set.length;i++) {
        if (resultSet.set.indexOf(set.set[i]) == -1) {
            resultSet.insert(set.set[i]);
        }
    }
    return resultSet;
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
