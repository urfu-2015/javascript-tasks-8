'use strict';

var Collection = function () {
    this.empty();
};

Object.defineProperties(Collection.prototype,
    {
        length: {
            get: function () {
                return this.collection.length;
            }
        },

        isEmpty: {
            get: function () {
                return this.collection.length === 0;
            }
        },

        first: {
            get: function () {
                return this.collection[0];
            }
        },

        last: {
            get: function () {
                return this.collection[this.length - 1];
            }
        }
    });


Collection.prototype.pickFirst = function () {
    return this.collection.shift();
};

Collection.prototype.pickLast = function () {
    return this.collection.pop();
};

Collection.prototype.insertFirst = function (element) {
    this.collection.unshift(element);
};

Collection.prototype.insertLast = function (element) {
    this.collection.push(element);
};

Collection.prototype.empty = function () {
    this.collection = [];
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
};

FixedArray.prototype = Object.create(Collection.prototype);

FixedArray.prototype.checkIndex = function (index) {
    if (index < this.length && index >= 0) {
        return true;
    } else {
        throw new RangeError('list index out of bounds');
    }
};

FixedArray.prototype.insertAt = function (index, item) {
    if (this.checkIndex(index)) {
        this.collection[index] = item;
    }
};

FixedArray.prototype.getAt = function (index) {
    if (this.checkIndex(index)) {
        return this.collection[index];
    }
};

var Set = function () {
    Collection.call(this);
};

Set.prototype = Object.create(Collection.prototype);

Set.prototype.insert = function (item) {
    if (this.collection.indexOf(item) === -1) {
        this.insertLast(item);
    }
};

Set.prototype.remove = function (item) {
    var index = this.collection.indexOf(item);
    if (index !== -1) {
        this.collection.splice(index, 1);
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
    var resultSet = new Set();
    resultSet.collection = this.collection.slice();
    otherSet.collection.forEach(function (item) {
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
