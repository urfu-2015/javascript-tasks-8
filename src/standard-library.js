'use strict';

function clear(object) {
    object.first = null;
    object.last = null;
    object.isEmpty = true;
}

var Collection = function () {
    this.collection = [];
    this.first = null;
    this.last = null;
    this.length = 0;
    this.isEmpty = true;
};
Collection.prototype.pickFirst = function () {
    if (!this.isEmpty) {
        var first = this.collection.shift();
        this.length -= 1;
        if (this.length === 0) {
            clear(this);
        } else {
            this.first = this.collection[0];
        }
        return first;
    }
    return this.first;
};
Collection.prototype.pickLast = function () {
    if (!this.isEmpty) {
        var last = this.collection.pop();
        this.length -= 1;
        if (this.length === 0) {
            clear(this);
        } else {
            this.last = this.collection[this.length - 1];
        }
        return last;
    }
    return this.last;
};
Collection.prototype.insertFirst = function (item) {
    if (typeof item !== 'undefined') {
        this.collection.unshift(item);
        this.first = this.collection[0];
        this.length += 1;
        if (this.isEmpty) {
            this.isEmpty = false;
            this.last = this.collection[0];
        }
    } else {
        return null;
    }
};
Collection.prototype.insertLast = function (item) {
    if (typeof item !== 'undefined') {
        this.collection.push(item);
        this.last = this.collection[this.length];
        this.length += 1;
        if (this.isEmpty) {
            this.isEmpty = false;
            this.first = this.collection[this.length - 1];
        }
    } else {
        return null;
    }
};
Collection.prototype.empty = function () {
    this.collection.length = 0;
    this.length = 0;
    clear(this);
};

var Queue = function () {
    this.collection = [];
    this.length = 0;
};
Queue.prototype = Object.create(Collection.prototype);
Queue.prototype.enqueue = function (item) {
    Collection.prototype.insertLast.call(this, item);
};
Queue.prototype.dequeue = function () {
    return Collection.prototype.pickFirst.call(this);
};
Queue.prototype.empty = function () {
    Collection.prototype.empty.call(this);
};

var FixedArray = function (size) {
    if (size < 0) {
        throw new RangeError('Некорректная длина!');
    }
    if (size === Infinity) {
        this.collection = [];
    } else {
        this.collection = new Array(size);
    }
    this.actualLength = 0;
    this.length = size;
};
FixedArray.prototype.insertAt = function (index, item) {
    if (index >= this.length || this.actualLength + 1 > this.length) {
        throw new RangeError('Нельзя добавить новый элемент!');
    }
    if (typeof item === 'undefined') {
        throw new Error('Нет элемента!');
    }
    this.collection[index] = item;
    this.actualLength += 1;
};
FixedArray.prototype.getAt = function (index) {
    if (index >= this.length) {
        throw new RangeError('Нельзя получить элемент по указанному индексу!');
    }
    return this.collection[index];
};

var Set = function (items) {
    this.collection = items || [];
    if (items) {
        this.length = items.length;
    } else {
        this.length = 0;
    }
};
Set.prototype = Object.create(Collection.prototype);
Set.prototype.insert = function (item) {
    if (!this.has(item)) {
        Collection.prototype.insertLast.call(this, item);
    }
};
Set.prototype.remove = function (item) {
    if (this.has(item)) {
        this.collection.splice(this.collection.indexOf(item), 1);
        this.length -= 1;
    }
};
Set.prototype.has = function (item) {
    return (this.collection.indexOf(item) + 1) > 0;
};
Set.prototype.intersect = function (otherSet) {
    var result = [];
    for (var i in this.collection) {
        if (otherSet.collection.indexOf(this.collection[i]) + 1) {
            result.push(this.collection[i]);
        }
    }
    return new Set(result);
};
Set.prototype.union = function (otherSet) {
    var result = this.collection;
    for (var i in otherSet.collection) {
        if (this.collection.indexOf(otherSet.collection[i]) === -1) {
            result.push(otherSet.collection[i]);
        }
    }
    return new Set(result);
};
Set.prototype.empty = function () {
    Collection.prototype.empty.call(this);
};

function findMaxPriority(collection) {
    var keys = Object.keys(collection);
    var max = '0';
    for (var i in keys) {
        if (parseInt(keys[i]) > parseInt(max)) {
            max = keys[i];
        }
    }
    return max;
}
var PriorityQueue = function () {
    this.collection = {};
    this.length = 0;
};
PriorityQueue.prototype.enqueue = function (item, priority) {
    if (typeof priority === 'undefined' || priority < 0) {
        priority = 0;
    }
    if (priority > 100) {
        priority = 100;
    }
    this.collection[priority] = this.collection[priority] || [];
    this.collection[priority].push(item);
    this.length += 1;
};
PriorityQueue.prototype.dequeue = function () {
    var result = null;
    if (this.length) {
        var maxPriority = findMaxPriority(this.collection);
        var maxPriorityArray = this.collection[maxPriority];
        result = maxPriorityArray.shift();
        this.length -= 1;
        if (maxPriorityArray.length === 0) {
            delete this.collection[maxPriority];
        }
    }
    return result;
};

var Map = function () {
    this.collection = {};
    this.length = 0;
};
Map.prototype.addItem = function (key, item) {
    var stringKey = JSON.stringify(key);
    this.collection[stringKey] = item;
    this.length += 1;
};
Map.prototype.removeItem = function (key) {
    var stringKey = JSON.stringify(key);
    if (this.collection[stringKey]) {
        delete this.collection[stringKey];
        this.length -= 1;
    }
};
Map.prototype.getItem = function (key) {
    var stringKey = JSON.stringify(key);
    if (this.collection[stringKey]) {
        return this.collection[stringKey];
    } else {
        return null;
    }
};
Map.prototype.empty = function () {
    for (var i in this.collection) {
        delete this.collection[i];
    }
    this.length = 0;
};

exports.Collection = Collection;
exports.Queue = Queue;
exports.FixedArray = FixedArray;
exports.Set = Set;
exports.PriorityQueue = PriorityQueue;
exports.Map = Map;
