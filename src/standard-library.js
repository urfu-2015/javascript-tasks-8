'use strict';

var Collection = function () {
    this.first = null;
    this.last = null;
    this.length = 0;
    this.isEmpty = true;
    this.collection = [];
};

Collection.prototype.pickFirst = function () {
    var result = this.first;
    if (this.length > 1) {
        this.first = this.collection[1];
    } else {
        this.first = null;
        this.last = null;
        this.isEmpty = true;
    }
    this.collection.splice(0, 1);
    this.length -= 1;
    return result;
};

Collection.prototype.pickLast = function () {
    var result = this.last;
    if (this.length > 1) {
        this.last = this.collection[this.length - 2];
    } else {
        this.first = null;
        this.last = null;
        this.isEmpty = true;
    }
    this.collection.splice(-1, 1);
    this.length -= 1;
    return result;
};

Collection.prototype.insertFirst = function (item) {
    this.first = item;
    this.length += 1;
    this.collection = [item].concat(this.collection);
    this.last = this.collection[this.length - 1];
    this.isEmpty = false;
};

Collection.prototype.insertLast = function (item) {
    this.collection = this.collection.concat(item);
    this.length += 1;
    this.first = this.collection[0];
    this.last = item;
    this.isEmpty = false;
};

Collection.prototype.empty = function () {
    this.first = null;
    this.last = null;
    this.length = 0;
    this.isEmpty = true;
    this.collection = [];
};

var Queue = function () {
    this.collection = [];
    this.length = 0;
};

Queue.prototype = Object.create(Collection.prototype);

Queue.prototype.enqueue = function (item) {
    this.insertLast(item);
};

Queue.prototype.dequeue = function () {
    return this.pickFirst();
};

var FixedArray = function (size) {
    this.length = size;
    this.collection = [];
    this.checkIndex = function (index) {
        if ((index > this.length - 1) || (index < 0)) {
            throw new RangeError('индекс вышел за границы массива');
        }
    };
};

FixedArray.prototype.insertAt = function (index, item) {
    this.checkIndex(index);
    this.collection[index] = item;
};

FixedArray.prototype.getAt = function (index) {
    this.checkIndex(index);
    return this.collection[index];
};

var Set = function () {
    this.collection = [];
    this.length = 0;
};

Set.prototype.insert = function (item) {
    if (this.collection.indexOf(item) === -1) {
        this.collection.push(item);
        this.length += 1;
    }
};

Set.prototype.remove = function (item) {
    var itemIndex = this.collection.indexOf(item);
    if (itemIndex !== -1) {
        this.collection.splice(itemIndex, 1);
        this.length -= 1;
    }
};

Set.prototype.has = function (item) {
    return this.collection.indexOf(item) !== -1;
};

Set.prototype.intersect = function (set) {
    var found_intersect = this.collection.filter(function (item) {
        console.log(set);
        return set.collection.indexOf(item) !== -1;
    });
    var resultSet = new Set();
    resultSet.collection = found_intersect;
    resultSet.length = found_intersect.length;
    return resultSet;
};

Set.prototype.union = function (set) {
    var resultSet = new Set();
    set.collection.forEach(function (item) {
        if (this.collection.indexOf(item) === -1) {
            resultSet.insert(item);
        }
    }, this);
    resultSet.collection = resultSet.collection.concat(this.collection);
    resultSet.length = resultSet.collection.length;
    return resultSet;
};

Set.prototype.empty = function () {
    this.collection = [];
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
