'use strict';

var Collection = function () {
    this.first = null;
    this.last = null;
    this.length = 0;
    this.isEmpty = true;
    this.list = [];
};

Collection.prototype.pickFirst = function () {
    if (this.isEmpty) {
        return null;
    }
    var first = this.list[0];
    this.list = this.list.slice(1);
    this.length--;
    this.isEmpty = this.length === 0;
    this.first = this.isEmpty ? null : this.list[0];
    return first;
};

Collection.prototype.pickLast = function () {
    if (this.isEmpty) {
        return null;
    }
    var last = this.list[this.length - 1];
    this.list = this.list.slice(0, this.length - 2);
    this.length--;
    this.isEmpty = this.length === 0;
    this.last = this.isEmpty ? null : this.list[this.length - 1];
    return last;
};

Collection.prototype.insertFirst = function (elem) {
    if (this.isEmpty) {
        this.isEmpty = false;
        this.last = elem;
    }
    this.list = [elem].concat(this.list);
    this.first = elem;
    this.length++;
};

Collection.prototype.insertLast = function (elem) {
    if (this.isEmpty) {
        this.isEmpty = false;
        this.first = elem;
    }
    this.list.push(elem);
    this.length++;
    this.last = elem;
};

Collection.prototype.empty = function () {
    this.first = null;
    this.last = null;
    this.length = 0;
    this.isEmpty = true;
    this.list = [];
};

var Queue = function () {
    this.queue = [];
    this.length = 0;
    this.isEmpty = true;
};

Queue.prototype.enqueue = function (elem) {
    this.queue = this.queue.concat([elem]);
    this.length++;
    this.isEmpty = this.isEmpty ? false : this.isEmpty;
};

Queue.prototype.dequeue = function () {
    if (this.isEmpty) {
        return null;
    }
    var elem = this.queue[0];
    this.length--;
    this.queue = this.queue.slice(1);
    return elem;
};

var FixedArray = function (size) {
    this.length = size;
    this.fixedArray = [];
};

FixedArray.prototype.insertAt = function (index, item) {
    if (index > this.length - 1) {
        throw new RangeError('Элемент за пределами указанного диапазона ');
    }
    this.fixedArray.splice(index, 0, item);
};

FixedArray.prototype.getAt = function (index) {
    if (index > this.length - 1) {
        throw new RangeError('Элемент за пределами указанного диапазона ');
    } else {
        return this.fixedArray[index];
    }
};

var Set = function () {
    this.length = 0;
    this.elements = [];
};

Set.prototype.insert = function (item) {
    if (this.elements.indexOf(item) < 0) {
        this.elements.push(item);
        this.length++;
    }
};

Set.prototype.remove = function (item) {
    var index = this.elements.indexOf(item);
    if (index > -1) {
        this.elements.splice(index, 1);
        this.length--;
    }
};

Set.prototype.has = function (item) {
    return this.elements.indexOf(item) > -1;
};

Set.prototype.intersect = function (set) {
    var intersection = new Set();
    intersection.elements = this.elements.filter(function (elem) {
        return set.has(elem);
    });
    intersection.length = intersection.elements.length;
    return intersection;
};

Set.prototype.union = function (set) {
    var union = new Set();
    union.elements = set.elements;
    var elemFirstSet = this.elements.filter(function (elem) {
        return !(set.has(elem));
    });
    union.elements = union.elements.concat(elemFirstSet);
    union.length = union.elements.length;
    return union;
};

Set.prototype.empty = function () {
    this.length = 0;
    this.elements = [];
};
// var PriorityQueue = function () {

// };

// var Map = function () {

// };
exports.Collection = Collection;
exports.Queue = Queue;
exports.FixedArray = FixedArray;
exports.Set = Set;
// exports.PriorityQueue = PriorityQueue;
// exports.Map = Map;
