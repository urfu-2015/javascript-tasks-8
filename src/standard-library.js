'use strict';

var Collection = function () {
    this.values = [];
    Object.defineProperty(this, 'first', {
        get: function () {
            return this.length === 0 ? null : this.values[0];
        }
    });
    Object.defineProperty(this, 'last', {
        get: function () {
            return this.length === 0 ? null : this.values[this.length - 1];
        }
    });
    Object.defineProperty(this, 'length', {
        get: function () {
            return this.values.length;
        }
    });
    Object.defineProperty(this, 'isEmpty', {
        get: function () {
            return (this.values.length === 0);
        }
    });
};

Collection.prototype.pickFirst = function () {
    return this.length === 0 ? null : this.values.shift();
};

Collection.prototype.pickLast = function () {
    return this.length === 0 ? null : this.values.pop();
};

Collection.prototype.insertFirst = function (item) {
    this.values.unshift(item);
};

Collection.prototype.insertLast = function (item) {
    this.values.push(item);
};

Collection.prototype.empty = function () {
    this.values = [];
};

var Queue = function () {
    this.values = [];
    Object.defineProperty(this, 'length', {
        get: function () {
            return this.values.length;
        }
    });
};

Queue.prototype.enqueue = function (item) {
    this.values.push(item);
};

Queue.prototype.dequeue = function () {
    return this.length === 0 ? null : this.values.shift();
};

Queue.prototype.empty = function () {
    this.values = [];
};

var FixedArray = function (size) {
    this.values = [];
    this.length = size;
};

FixedArray.prototype.insertAt = function (index, item) {
    checkRange(this.length, index);
    this.values[index] = item;
};

FixedArray.prototype.getAt = function (index) {
    checkRange(this.length, index);
    return this.values[index];
};

function checkRange(length, index) {
    if (index < 0 || index >= length) {
        throw new RangeError('Error! Out of range!');
    }
}

var Set = function () {
    this.values = [];
    Object.defineProperty(this, 'length', {
        get: function () {
            return this.values.length;
        }
    });
};

Set.prototype.insert = function (item) {
    if (this.values.indexOf(item) < 0) {
        this.values.push(item);
    }
};

Set.prototype.remove = function (item) {
    if (this.values.indexOf(item) < 0) {
        throw new Error('Error! No element in set!');
    }
    this.values.splice(this.values.indexOf(item), 1);
};

Set.prototype.has = function (item) {
    return (this.values.indexOf(item) >= 0);
};

Set.prototype.intersect = function (set) {
    var result = new Set();
    this.values.forEach(function (item) {
        if (set.has(item)) {
            result.insert(item);
        }
    });
    return result;
};

Set.prototype.union = function (set) {
    var result = new Set();
    this.values.forEach(function (item) {
        result.insert(item);
    });
    set.values.forEach(function (item) {
        result.insert(item);
    });
    return result;
};

Set.prototype.empty = function () {
    this.values = [];
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
