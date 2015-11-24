'use strict';

var Collection = function () {
    this.items = [];
};

Object.defineProperty(Collection.prototype, 'isEmpty', {
    get: function () {
        return this.items.length === 0;
    }
});

Object.defineProperty(Collection.prototype, 'first', {
    get: function () {
        if (this.isEmpty) {
            throw new Error('Коллекция пуста');
        }
        return this.items[0];
    }
});

Object.defineProperty(Collection.prototype, 'last', {
    get: function () {
        if (this.isEmpty) {
            throw new Error('Коллекция пуста');
        }
        return this.items[this.length - 1];
    }
});

Object.defineProperty(Collection.prototype, 'length', {
    get: function () {
        return this.items.length;
    }
});

Collection.prototype.pickFirst = function () {
    return getElement.bind(this)('first');
};

Collection.prototype.pickLast = function () {
    return getElement.bind(this)('last');
};

function getElement(place) {
    if (this.isEmpty) {
        throw new Error('Коллекция пуста');
    }
    if (place === 'first') {
        return this.items.shift();
    }
    return this.items.pop();
}

Collection.prototype.insertFirst = function (element) {
    this.items.unshift(element);
};

Collection.prototype.insertLast = function (element) {
    this.items.push(element);
};

Collection.prototype.empty = function () {
    this.items = [];
};

var Queue = function () {
    this.items = [];
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
    check.bind(this)(index);
    this.fixedArray[index] = item;
};

FixedArray.prototype.getAt = function (index) {
    check.bind(this)(index);
    return this.fixedArray[index];
};

function check(index) {
    if (index > this.length - 1 || index < 0) {
        throw new RangeError('Некорректный индекс');
    }
}

var Set = function () {
    this.items = [];
};

Set.prototype = Object.create(Collection.prototype);

Set.prototype.insert = function (item) {
    if (!this.has(item)) {
        this.insertFirst(item);
    }
};

Set.prototype.remove = function (item) {
    var index = this.items.indexOf(item);
    if (index === -1) {
        throw new Error('Нет такого элемента');
    }
    this.items.splice(index, 1);
};

Set.prototype.has = function (item) {
    return this.items.indexOf(item) !== -1;
};

Set.prototype.intersect = function (set) {
    var intersectSet = new exports.Set();
    for (var i = 0; i < this.items.length; i++) {
        if (set.has(this.items[i])) {
            intersectSet.insert(this.items[i]);
        }
    }
    for (var i = 0; i < set.items.length; i++) {
        if (intersectSet.has(set.items[i]) && this.has(set.items[i])) {
            intersectSet.insert(set.items[i]);
        }
    }
    return intersectSet;
};

Set.prototype.union = function (set) {
    var unionSet = new exports.Set();
    for (var i = 0; i < this.items.length; i++) {
        unionSet.insert(this.items[i]);
    }
    for (var i = 0; i < set.items.length; i++) {
        unionSet.insert(set.items[i]);
    }
    return unionSet;
};

var PriorityQueue = function () {
    this.queue = new Queue();
    this.priorities = [];
};

PriorityQueue.prototype = Object.create(Collection.prototype);

PriorityQueue.prototype.enqueue = function (item, priority) {
    this.queue.enqueue(item);
    this.priorities.unshift(priority);
};

PriorityQueue.prototype.dequeue = function () {
    if (this.isEmpty) {
        throw new Error('Очередь пуста');
    }
    var max = Math.max.apply(null, this.priorities);
    var index = this.priorities.lastIndexOf(max);
    this.priorities.splice(index, 1);
    return this.queue.items.splice(index, 1)[0];
};

var Map = function () {
    this.map = [];
    this.items = [];
};

Object.defineProperty(Map.prototype, 'length', {
    get: function () {
        return this.map.length;
    }
});


Map.prototype.addItem = function (key, item) {
    var index = this.map.indexOf(key);
    if (index === -1) {
        this.map.push(key);
        this.items.push(item);
    } else {
        this.items[index] = item;
    }
};

Map.prototype.removeItem = function (key) {
    var index = getIndex.bind(this)(key);
    this.map.splice(index, 1);
    this.items.splice(index, 1);
};

Map.prototype.getItem = function (key) {
    var index = getIndex.bind(this)(key);
    return this.items[index];
};

function getIndex(key) {
    var index = this.map.indexOf(key);
    if (index === -1) {
        throw new Error('Нет такого ключа');
    }
    return index;
}

Map.prototype.empty = function () {
    this.map = [];
    this.items = [];
};

exports.Collection = Collection;
exports.Queue = Queue;
exports.FixedArray = FixedArray;
exports.Set = Set;
exports.PriorityQueue = PriorityQueue;
exports.Map = Map;
exports.PriorityQueue = PriorityQueue;
exports.Map = Map;
