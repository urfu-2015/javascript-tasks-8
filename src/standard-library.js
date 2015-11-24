'use strict';

var Collection = function () {
    this.collection = [];
    this.first = null;
    this.last = null;
    this.length = 0;
    this.isEmpty = true;
};

Collection.prototype.pickFirst = function () {
    if (this.length === 1) {
        this.length -= 1;
        this.isEmpty = true;
        this.first = null;
        this.last = null;
    }
    if (this.length > 1) {
        this.length -= 1;
        this.first = this.collection[1];
    }
    return this.collection.shift();
};

Collection.prototype.pickLast = function () {
    if (this.length === 1) {
        this.length -= 1;
        this.isEmpty = true;
        this.first = null;
        this.last = null;
    }
    if (this.length > 1) {
        this.last = this.collection[this.length - 2];
        this.length -= 1;
    }
    return this.collection.pop();
};

Collection.prototype.insertFirst = function (element) {
    this.length = this.collection.unshift(element);
    this.first = element;
    if (this.length === 1) {
        this.last = element;
    }
    this.isEmpty = false;
};

Collection.prototype.insertLast = function (element) {
    this.length = this.collection.push(element);
    this.last = element;
    if (this.length === 1) {
        this.first = element;
    }
    this.isEmpty = false;
};

Collection.prototype.empty = function () {
    this.collection = [];
    this.first = null;
    this.last = null;
    this.length = 0;
    this.isEmpty = true;
};

var Queue = function () {
    Collection.call(this);
};

Queue.prototype = Object.create(Collection.prototype);

Queue.prototype.enqueue = function (item) {
    this.insertLast(item);
};

Queue.prototype.dequeue = function () {
    return this.pickFirst();
};

var FixedArray = function (size) {
    Collection.call(this);
    this.collection = new Array(size);
    this.length = size;
};

FixedArray.prototype = Object.create(Collection.prototype);

FixedArray.prototype.insertAt = function (index, item) {
    if (index < this.length && index >= 0) {
        this.collection[index] = item;
    } else {
        throw new RangeError('list index out of bounds');
    }
};

FixedArray.prototype.getAt = function (index) {
    if (index < this.length && index >= 0) {
        return this.collection[index];
    } else {
        throw new RangeError('list index out of bounds');
    }
};

var Set = function (set, size) {
    Collection.call(this);
    if (set && size) {
        this.collection = set;
        this.length = size;
    }
};

Set.prototype = Object.create(Collection.prototype);

Set.prototype.insert = function (item) {
    if (this.collection.indexOf(item) === -1) {
        this.insertLast(item);
    }
};

Set.prototype.remove = function (item) {
    for (var index = 0; index < this.length; index++) {
        if (this.collection[index] === item) {
            this.collection.splice(index, 1);
            this.length -= 1;
            break;
        }
    }
};

Set.prototype.has = function (item) {
    return this.collection.indexOf(item) !== -1;
};

Set.prototype.intersect = function (otherSet) {
    var resultSet = new Set();
    this.collection.forEach(function (item) {
        if (otherSet.has(item)) {
            resultSet.insertLast(item);
        }
    });
    return resultSet;
};

Set.prototype.union = function (otherSet) {
    var resultSet = Object.create(this);
    otherSet.collection.forEach(function (item) {
        resultSet.insert(item);
    });
    return resultSet;
};

Set.prototype.empty = function () {
    this.empty();
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
