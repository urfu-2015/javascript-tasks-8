'use strict';

var Collection = function () {
    this.collection = [];
    this.first = null;
    this.last = null;
    this.length = 0;
    this.isEmpty = true;
};

Collection.prototype.pickFirst = function () {
    if (!this.isEmpty) {
        var element = this.collection.shift();
        this.length = this.collection.length;
        this.isEmpty = this.length === 0;
        if (!this.isEmpty) {
            this.first = this.collection[0];
            this.last = this.collection[this.length - 1];
        }
        return element;
    }
    throw new Error('Коллекция пуста');
};

Collection.prototype.pickLast = function () {
    if (!this.isEmpty) {
        var element = this.collection.pop();
        this.length = this.collection.length;
        this.isEmpty = this.length === 0;
        if (!this.isEmpty) {
            this.first = this.collection[0];
            this.last = this.collection[this.length - 1];
        }
        return element;
    }
    throw new Error('Коллекция пуста');
};

Collection.prototype.insertFirst = function (element) {
    this.collection.unshift(element);
    this.first = element;
    this.length = this.collection.length;
    this.last = this.collection[this.length - 1];
    this.isEmpty = false;
};

Collection.prototype.insertLast = function (element) {
    this.collection.push(element);
    this.last = element;
    this.first = this.collection[0];
    this.isEmpty = false;
    this.length = this.collection.length;
};

Collection.prototype.empty = function () {
    this.collection = [];
    this.isEmpty = true;
    this.first = null;
    this.last = null;
};

var Queue = function () {
    this.collection = [];
    this.length = 0;
};

Queue.prototype = Object.create(Collection.prototype);

Queue.prototype.enqueue = function (item) {
    this.insertFirst(item);
};

Queue.prototype.dequeue = function () {
    return this.pickLast();
};

Queue.prototype.empty = function () {
    this.empty();
};

var FixedArray = function (size) {
    this.fixedArray = [];
    this.length = size;
};

FixedArray.prototype.insertAt = function (index, item) {
    if (index > this.length - 1 || index < 0) {
        throw new RangeError('Некорректный индекс');
    }
    this.fixedArray[index] = item;
};

FixedArray.prototype.getAt = function (index) {
    if (index > this.length - 1 || index < 0) {
        throw new RangeError('Некорректный индекс');
    }
    return this.fixedArray[index];
};

var Set = function () {
    this.length = 0;
    this.collection = [];
};

Set.prototype = Object.create(Collection.prototype);

Set.prototype.insert = function (item) {
    if (!this.has(item)) {
        this.insertFirst(item);
    }
};

Set.prototype.remove = function (item) {
    var index = this.collection.indexOf(item);
    if (index !== -1) {
        this.collection.splice(index, 1);
        this.length -= 1;
    } else {
        throw new Error('Нет такого элемента');
    }
};

Set.prototype.has = function (item) {
    return this.collection.indexOf(item) !== -1;
};

Set.prototype.intersect = function (set) {
    var intersectSet = new Set();
    for (var i = 0; i < this.collection.length; i++) {
        if (set.has(this.collection[i])) {
            intersectSet.insert(this.collection[i]);
        }
    }
    for (var i = 0; i < set.collection.length; i++) {
        if (intersectSet.has(set.collection[i]) && this.has(set.collection[i])) {
            intersectSet.insert(set.collection[i]);
        }
    }
    return intersectSet;
};

Set.prototype.union = function (set) {
    var unionSet = new Set();
    for (var i = 0; i < this.collection.length; i++) {
        unionSet.insert(this.collection[i]);
    }
    for (var i = 0; i < set.collection.length; i++) {
        unionSet.insert(set.collection[i]);
    }
    return unionSet;
};

Set.prototype.empty = function () {
    this.empty();
};

var PriorityQueue = function () {
    this.queue = new Queue();
    this.priorities = [];
    this.length = 0;
};

PriorityQueue.prototype = Object.create(Collection.prototype);

PriorityQueue.prototype.enqueue = function (item, priority) {
    this.queue.enqueue(item);
    this.length = this.queue.length;
    this.priorities.unshift(priority);
};

PriorityQueue.prototype.dequeue = function () {
    if (!this.isEmpty) {
        var max = Math.max.apply(null, this.priorities);
        var index = this.priorities.lastIndexOf(max);
        this.priorities.splice(index, 1);
        this.length -= 1;
        return this.queue.collection.splice(index, 1)[0];
    }
    throw new Error('Очередь пуста');
};

var Map = function () {
    this.length = 0;
    this.map = {};
};

Map.prototype.addItem = function (key, item) {
    this.map[key.toString()] = item;
    this.length += 1;
};

Map.prototype.removeItem = function (key) {
    if (Object.keys(this.map).indexOf(key.toString()) !== -1) {
        var element = this.map[key.toString()];
        delete this.map[key.toString()];
        this.length -= 1;
        return element;
    }
    throw new Error('Нет такого ключа');
};

Map.prototype.getItem = function (key) {
    if (Object.keys(this.map).indexOf(key.toString()) !== -1) {
        return this.map[key];
    }
    throw new Error('Нет такого ключа');
};

Map.prototype.empty = function () {
    this.map = {};
    this.length = 0;
};

exports.Collection = Collection;
exports.Queue = Queue;
exports.FixedArray = FixedArray;
exports.Set = Set;
exports.PriorityQueue = PriorityQueue;
exports.Map = Map;
exports.PriorityQueue = PriorityQueue;
exports.Map = Map;
