'use strict';

var Collection = function () {
    this.collection = [];
    this.first = undefined;
    this.last = undefined;
    this.length = 0;
    this.isEmpty = true;
};
Collection.prototype.refreshProperties = function () {
    this.first = this.collection[0];
    this.last = this.collection[this.collection.length - 1];
    this.length = this.collection.length;
    this.isEmpty = this.length > 0 ? false : true;
};
Collection.prototype.pickFirst = function () {
    if (this.isEmpty) {
        return undefined;
    }
    var res = this.collection.shift();
    this.refreshProperties();
    return res;

};
Collection.prototype.pickLast = function () {
    if (this.isEmpty) {
        return undefined;
    }
    var res = this.collection.pop();
    this.refreshProperties();
    return res;

};
Collection.prototype.insertFirst = function (item) {
    this.collection.unshift(item);
    this.refreshProperties();
};
Collection.prototype.insertLast = function (item) {
    this.collection.push(item);
    this.refreshProperties();
};
Collection.prototype.empty = function () {
    this.collection = Object.create(null);
    this.refreshProperties();
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
    this.collection = [];
    this.length = size;
};
FixedArray.prototype.insertAt = function (index, item) {
    if (index >= this.length) {
        throw new RangeError('Index out of range');
    }
    this.collection[index] = item;
};
FixedArray.prototype.getAt = function (index) {
    if (index >= this.length) {
        throw new RangeError('Index out of range');
    }
    return this.collection[index];
};

var Set = function () {
    this.collection = [];
    this.length = 0;
};
Set.prototype.insert = function (item) {
    var index = this.collection.indexOf(item);

    index = index < 0 ? this.collection.length : index;
    this.collection[index] = item;
    this.length = this.collection.length;
};
Set.prototype.remove = function (item) {
    var itemIndex = this.collection.indexOf(item);

    if (itemIndex < 0) {
        throw new Error('No such item');
    }
    this.collection.splice(itemIndex, 1);
    this.length = this.collection.length;
};
Set.prototype.has = function (item) {
    return this.collection.indexOf(item) >= 0;
};
Set.prototype.intersect = function (set) {
    var resultSet = new Set();

    this.collection.forEach(function (item) {
        if (set.has(item)) {
            resultSet.insert(item);
        }
    });
    return resultSet;
};
Set.prototype.union = function (set) {
    var resultSet = new Set();

    resultSet.collection = Object.assign([], this.collection);
    set.collection.forEach(function (item) {
        resultSet.insert(item);
    });
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

