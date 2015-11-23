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
    this.queue = [];
    this.length = 0;
};

Queue.prototype = Object.create(Collection.prototype);

Queue.prototype.enqueue = function (item) {
    this.length = this.queue.push(item);
};

Queue.prototype.dequeue = function () {
    this.length -= 1;
    return this.queue.shift();
};

var FixedArray = function (size) {
    this.array = new Array(size);
    this.length = size;
};

FixedArray.prototype = Object.create(Collection.prototype);

FixedArray.prototype.insertAt = function (index, item) {
    if (index < this.length && index >= 0) {
        this.array[index] = item;
    } else {
        throw new RangeError('list index out of bounds');
    }
};

FixedArray.prototype.getAt = function (index) {
    if (index < this.length && index >= 0) {
        return this.array[index];
    } else {
        throw new RangeError('list index out of bounds');
    }
};

var Set = function (set, size) {
    if (set && size) {
        this.set = set;
        this.length = size;
    } else {
        this.set = [];
        this.length = 0;
    }
};

Set.prototype = Object.create(Collection.prototype);

Set.prototype.insert = function (item) {
    if (this.set.indexOf(item) === -1) {
        this.set.push(item);
        this.length += 1;
    }
};

Set.prototype.remove = function (item) {
    var setSize = this.set.length;
    for (var index = 0; index < setSize; index++) {
        if (this.set[index] === item) {
            this.set.splice(index, 1);
            this.length -= 1;
            break;
        }
    }
};

Set.prototype.has = function (item) {
    return this.set.indexOf(item) !== -1;
};

Set.prototype.intersect = function (otherSet) {
    var resultSet = [];
    var resultLength = 0;
    this.set.forEach(function (item) {
        if (otherSet.has(item)) {
            resultSet.push(item);
            resultLength += 1;
        }
    });
    return new Set(resultSet, resultLength);
};

Set.prototype.union = function (otherSet) {
    var resultSet = this.set;
    var resultLength = this.length;
    otherSet.set.forEach(function (item) {
        if (resultSet.indexOf(item) === -1) {
            resultSet.push(item);
            resultLength += 1;
        }
    });
    return new Set(resultSet, resultLength);
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
