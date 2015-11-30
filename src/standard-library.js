'use strict';

var Collection = function () {
    this.empty();
};

Object.defineProperty(Collection.prototype, 'length', {
    get: function () {
        return this.storage.length;
    }
});

Object.defineProperty(Collection.prototype, 'isEmpty', {
    get: function () {
        return this.storage.length === 0;
    }
});

Object.defineProperty(Collection.prototype, 'first', {
    get: function () {
        return this.storage[0];
    }
});

Object.defineProperty(Collection.prototype, 'last', {
    get: function () {
        return this.storage[this.length - 1];
    }
});

Collection.prototype.pickFirst = function () {
    if (this.storage.length === 0) {
        throw new Error('Коллекция пуста');
    }
    return this.storage.shift();
};

Collection.prototype.pickLast = function () {
    if (this.storage.length === 0) {
        throw new Error('Коллекция пуста');
    }
    return this.storage.pop();
};

Collection.prototype.insertFirst = function (element) {
    this.storage.unshift(element);
};

Collection.prototype.insertLast = function (element) {
    this.storage.push(element);
};

Collection.prototype.empty = function () {
    this.storage = [];
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
    if (!this._isValidIndex(index)) {
        throw new RangeError('Указан недопустимый индекс');
    }
    this.storage[index] = item;
};

FixedArray.prototype.getAt = function (index) {
    if (!this._isValidIndex(index)) {
        throw new RangeError('Указан недопустимый индекс');
    }
    return this.storage[index];
};

FixedArray.prototype._isValidIndex = function (index) {
    return index < this.length && index >= 0;
};

var Set = function () {
    this.empty();
};

Object.defineProperty(Set.prototype, 'length', {
    get: function () {
        return this.storage.length;
    }
});


Set.prototype.insert = function (item) {
    if (this.has(item)) {
        return;
    }
    this.storage.push(item);
};

Set.prototype.remove = function (item) {
    if (!this.has(item)) {
        return;
    }
    this.storage.splice(this.storage.indexOf(item), 1);
};

Set.prototype.has = function (item) {
    return this.storage.indexOf(item) !== -1;
};

Set.prototype.intersect = function (set) {
    var resultSet = new Set();
    for (var i = 0; i < this.length; i++) {
        if (set.has(this.storage[i])) {
            resultSet.insert(this.storage[i]);
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
