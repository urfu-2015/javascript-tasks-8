'use strict';
var Data = function () {
    this.data = [];
    this.length = 0;
};

var Collection = function () {
    Data.call(this);
    this.first = null;
    this.last = null;
    this.isEmpty = true;
};

Collection.prototype = Object.create(Data.prototype);

Collection.prototype.insertLast = function (item) {
    this.data.push(item);
    this.first = this.data[0];
    this.last = item;
    this.length += 1;
    this.isEmpty = this.length == 0;
};

Collection.prototype.insertFirst = function (item) {
    this.data = [item].concat(this.data);
    this.first = item;
    this.length += 1;
    this.isEmpty = this.length == 0;
    this.last = this.data[this.length - 1];
};

Collection.prototype.pickFirst = function () {
    var first = this.data.shift();
    this.length = this.data.length;
    this.isEmpty = this.length == 0;
    if (this.isEmpty) {
        this.first = null;
        this.last = null;
    } else {
        this.first = this.data[0];
    }
    return first;
};

Collection.prototype.pickLast = function () {
    var last = this.data.pop();
    this.length = this.data.length;
    this.isEmpty = this.length == 0;
    if (this.isEmpty) {
        this.first = null;
        this.last = null;
    } else {
        console.log(this.length);
        this.last = this.data[this.length - 1];
    }
    return last;
};

Collection.prototype.empty = function () {
    this.data = [];
    this.first = null;
    this.last = null;
    this.length = 0;
    this.isEmpty = true;
};

var Queue = function () {
    Data.call(this);
};

Queue.prototype = Object.create(Data.prototype);

Queue.prototype.enqueue = function (item) {
    this.data.push(item);
    this.length += 1;
};

Queue.prototype.dequeue = function () {
    var first = this.data.shift();
    this.length = this.data.length;
    return first;
};

Queue.prototype.empty = function () {
    this.data = [];
    this.length = 0;
};

var FixedArray = function (size) {
    this.data = [];
    for (var i = 0; i < size; i++) {
        this.data[i] = undefined;
    }
    this.length = size;
};

FixedArray.prototype.insertAt = function (index, item) {
    if (index < 0 || index >= this.length) {
        throw new RangeError('Индекс выходит за пределы массива');
    }
    this.data.splice(index, 1, item);
};

FixedArray.prototype.getAt = function (index) {
    if (index < 0 || index >= this.length) {
        throw new RangeError('Индекс выходит за пределы массива');
    }
    return this.data[index];
};

var Set = function () {
    this.data = [];
    this.length = 0;
};

Set.prototype.insert = function (item) {
    if (this.has(item)) {
        return;
    }
    this.data.push(item);
    this.length += 1;
};

Set.prototype.remove = function (item) {
    this.data.splice(this.data.indexOf(item), 1);
    this.length = this.data.length;
};

Set.prototype.has = function (item) {
    return this.data.indexOf(item) > -1;
};

Set.prototype.intersect = function (set) {
    var res = new Set();
    this.data.forEach(function (item) {
        if (set.has(item)) {
            res.insert(item);
        }
    });
    return res;
};

Set.prototype.union = function (set) {
    var res = new Set();
    this.data.forEach(function (item) {
        res.insert(item);
    });
    set.data.forEach(function (item) {
        if (!this.has(item)) {
            res.insert(item);
        }
    }, this);
    return res;
};

Set.prototype.empty = function () {
    this.data = [];
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
